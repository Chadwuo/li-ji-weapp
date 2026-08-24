#!/usr/bin/env bash
set -Eeuo pipefail

REPO_RAW_URL="https://raw.githubusercontent.com/chadwuo/li-ji-weapp/main/deploy"
PROJECT_URL="https://github.com/chadwuo/li-ji-weapp"
DEFAULT_INSTALL_DIR="$PWD"
DEFAULT_API_IMAGE="chadwuo/li-ji-api:latest"
DEFAULT_WEB_IMAGE="chadwuo/li-ji-web:latest"
DEFAULT_API_PORT="8080"
DEFAULT_WEB_PORT="80"

print_header() {
  printf '\nLi-Ji 一键部署\n'
  printf '前端 Web + API 服务\n'
  printf '────────────────────────────────────────\n\n'
}

step() {
  printf '\n[%s] %s\n' "$1" "$2"
}

success() {
  printf '  [完成] %s\n' "$*"
}

detail() {
  printf '  %s\n' "$*"
}

info() {
  printf '  [信息] %s\n' "$*"
}

warn() {
  printf '  [注意] %s\n' "$*"
}

fail() {
  printf '\n  [失败] %s\n' "$*" >&2
  exit 1
}

has_tty() {
  [[ -r /dev/tty && -w /dev/tty ]]
}

prompt_value() {
  local label="$1"
  local default_value="$2"
  local value

  has_tty || fail "安装需要交互式终端，请在终端中执行脚本。"
  printf '%s [%s]: ' "$label" "$default_value" > /dev/tty
  IFS= read -r value < /dev/tty || value=""
  printf '%s' "${value:-$default_value}"
}

confirm_install() {
  local answer

  has_tty || fail "安装需要交互式终端，请在终端中执行脚本。"
  printf '\n确认部署到以上配置？ [Y/n]: ' > /dev/tty
  IFS= read -r answer < /dev/tty || answer=""
  [[ -z "$answer" || "$answer" =~ ^[Yy]([Ee][Ss])?$ ]]
}

print_summary() {
  printf '\n部署配置\n'
  printf '  %-12s %s\n' '部署目录' "$INSTALL_DIR"
  printf '  %-12s %s\n' 'API 镜像' "$API_IMAGE"
  printf '  %-12s %s\n' '前端镜像' "$WEB_IMAGE"
  printf '  %-12s %s\n' 'API 端口' "$API_PORT"
  printf '  %-12s %s\n' '前端端口' "$WEB_PORT"
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "缺少必要命令：$1"
}

download_file() {
  local url="$1"
  local target="$2"

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$url" -o "$target"
    return
  fi

  if command -v wget >/dev/null 2>&1; then
    wget -q "$url" -O "$target"
    return
  fi

  fail "缺少 curl 或 wget，请先安装其中一个后重新执行脚本。"
}

download_file_if_missing() {
  local url="$1"
  local target="$2"

  if [[ -f "$target" ]]; then
    warn "${target} 已存在，保留现有文件。"
    return 0
  fi

  download_file "$url" "$target"
}

download_compose() {
  if [[ -f docker-compose.yml ]] && grep -q 'li-ji-web' docker-compose.yml; then
    warn "docker-compose.yml 已存在，保留现有文件。"
    return
  fi

  if [[ -f docker-compose.yml ]]; then
    cp docker-compose.yml docker-compose.yml.backup
    warn "检测到旧版 Compose，已备份为 docker-compose.yml.backup。"
  fi

  download_file "${REPO_RAW_URL}/docker-compose.yml" docker-compose.yml
}

random_hex() {
  local bytes="$1"

  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex "$bytes"
    return
  fi

  if [[ -r /dev/urandom ]]; then
    od -An -N "$bytes" -tx1 /dev/urandom | tr -d ' \n'
    return
  fi

  fail "无法生成随机值，请先安装 openssl 后重新执行脚本。"
}

set_env_value() {
  local key="$1"
  local value="$2"
  local file="$3"
  local escaped

  escaped=$(printf '%s' "$value" | sed 's/[\\/&]/\\&/g')
  if grep -q "^${key}=" "$file"; then
    sed -i "s/^${key}=.*/${key}=${escaped}/" "$file"
  else
    printf '%s=%s\n' "$key" "$value" >> "$file"
  fi
}

set_json_string_value() {
  local key="$1"
  local value="$2"
  local file="$3"
  local escaped

  escaped=$(printf '%s' "$value" | sed 's/[\\/&]/\\&/g')
  sed -i -E "s#(\"${key}\"[[:space:]]*:[[:space:]]*\")[^\"]*(\")#\1${escaped}\2#" "$file"
}

download_config_file() {
  local name="$1"
  local target="Configuration/${name}"

  if [[ -f "$target" ]]; then
    warn "${target} 已存在，保留现有文件。"
    return 1
  fi

  if ! download_file "${REPO_RAW_URL}/Configuration/${name}" "$target"; then
    fail "无法下载 Configuration/${name}，请检查网络或仓库地址。"
  fi
  return 0
}

prepare_runtime_permissions() {
  local api_uid api_gid

  if [[ "$(id -u)" -ne 0 ]]; then
    fail "持久化目录需要授权给容器用户，请使用 root 或 sudo 执行安装脚本。"
  fi

  api_uid="$(docker run --rm --entrypoint id "$API_IMAGE" -u)" \
    || fail "无法读取 API 镜像的运行用户 UID。"
  api_gid="$(docker run --rm --entrypoint id "$API_IMAGE" -g)" \
    || fail "无法读取 API 镜像的运行用户 GID。"

  chown -R "${api_uid}:${api_gid}" data logs wwwroot/oss/avatar \
    || fail "无法设置持久化目录所有者 ${api_uid}:${api_gid}。"
  chmod -R u+rwX data logs wwwroot/oss/avatar \
    || fail "无法设置持久化目录写权限。"
  chmod 750 data logs wwwroot/oss/avatar \
    || fail "无法设置持久化目录访问权限。"

  info "已将持久化目录授权给容器用户 ${api_uid}:${api_gid}。"
}

validate_port() {
  local normalized

  [[ "$1" =~ ^[0-9]+$ ]] || return 1
  normalized="$(printf '%s' "$1" | sed 's/^0*//')"
  [[ -n "$normalized" ]] || normalized=0
  ((normalized >= 1 && normalized <= 65535))
}

print_header

step '1/6' '检查运行环境'
require_command docker
if ! docker compose version >/dev/null 2>&1; then
  fail "需要 Docker Compose v2。请安装 docker compose 插件后重新执行脚本。"
fi
if ! docker info >/dev/null 2>&1; then
  fail "当前用户无法访问 Docker。请将当前用户加入 docker 用户组，或使用有权限的用户执行。"
fi
success 'Docker 和 Docker Compose v2 可用'

step '2/6' '收集部署配置'
INSTALL_DIR="$(prompt_value '部署目录' "$DEFAULT_INSTALL_DIR")"
[[ -n "$INSTALL_DIR" && "$INSTALL_DIR" != "/" ]] || fail "部署目录无效。"
[[ "$INSTALL_DIR" == /* ]] || fail "部署目录必须使用绝对路径。"

API_IMAGE="$DEFAULT_API_IMAGE"
WEB_IMAGE="$DEFAULT_WEB_IMAGE"
API_PORT="$(prompt_value 'API 宿主机端口' "$DEFAULT_API_PORT")"
WEB_PORT="$(prompt_value '前端宿主机端口' "$DEFAULT_WEB_PORT")"

validate_port "$API_PORT" || fail "API 端口必须是 1 到 65535 之间的数字。"
validate_port "$WEB_PORT" || fail "前端端口必须是 1 到 65535 之间的数字。"
print_summary
confirm_install || fail "已取消部署。"
success '部署配置已确认'

step '3/6' '准备部署文件'
mkdir -p "$INSTALL_DIR" || fail "无法创建 ${INSTALL_DIR}。请检查目录权限。"
cd "$INSTALL_DIR"

download_compose
download_file_if_missing "${REPO_RAW_URL}/.env.example" .env.example
success 'Compose 和环境模板已准备'

if [[ ! -f .env ]]; then
  cp .env.example .env
  set_env_value LIJI_IMAGE "$API_IMAGE" .env
  set_env_value LIJI_WEB_IMAGE "$WEB_IMAGE" .env
  set_env_value LIJI_PORT "$API_PORT" .env
  set_env_value LIJI_WEB_PORT "$WEB_PORT" .env
  info "已创建 .env。"
else
  set_env_value LIJI_IMAGE "$API_IMAGE" .env
  set_env_value LIJI_WEB_IMAGE "$WEB_IMAGE" .env
  set_env_value LIJI_PORT "$API_PORT" .env
  set_env_value LIJI_WEB_PORT "$WEB_PORT" .env
  info "已更新 .env 中的镜像和端口。"
fi

step '4/6' '初始化持久化目录和业务配置'
mkdir -p Configuration data logs data/WxPayCert wwwroot/oss/avatar
for config in App.json Cache.json Database.json Email.json Logging.json Wechat.json; do
  download_config_file "$config" || true
done

if download_config_file JWT.json; then
  set_json_string_value IssuerSigningKey "$(random_hex 32)" Configuration/JWT.json
  info "已创建 Configuration/JWT.json，并生成 JWT 签名密钥。"
fi
success '数据目录和业务配置已准备'

step '5/6' '拉取前端和 API 镜像'
detail "$API_IMAGE"
detail "$WEB_IMAGE"
docker compose pull
success '镜像拉取完成'

prepare_runtime_permissions

step '6/6' '启动 Li-Ji 服务'
docker compose up -d
success '前端和 API 容器已启动'

cat <<EOF

Li-Ji 部署完成
部署目录：${INSTALL_DIR}
前端地址：http://localhost:${WEB_PORT}
API 地址：http://localhost:${API_PORT}
健康检查：http://localhost:${API_PORT}/health

常用命令：
  cd ${INSTALL_DIR} && docker compose logs -f
  cd ${INSTALL_DIR} && docker compose pull && docker compose up -d
  cd ${INSTALL_DIR} && docker compose down

────────────────────────────────────────
每一份人情都值得礼记
项目主页：${PROJECT_URL}
欢迎 Star、反馈与贡献，请保留项目署名。
EOF
