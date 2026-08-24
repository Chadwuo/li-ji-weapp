# Li-Ji Docker 部署

本目录提供完整的 Li-Ji 部署文件。API 源码不在本仓库，安装时会从 Docker Hub 拉取 `chadwuo/li-ji-api`；前端 H5 使用公开的 `chadwuo/li-ji-web` 镜像。Nginx 前端容器负责静态文件和 `/api/`、`/oss/` 反向代理，用户只需要访问一个地址。

## 环境要求

- Linux 服务器（推荐 Ubuntu 22.04 或更新版本）
- Docker Engine
- Docker Compose v2（命令为 `docker compose`）
- 能访问 GitHub Raw 和 Docker Hub

## 在线安装

建议先创建独立部署目录，再执行安装脚本：

```bash
mkdir -p li-ji-deploy
cd li-ji-deploy
curl -fsSL https://raw.githubusercontent.com/chadwuo/li-ji-weapp/main/deploy/install.sh | bash
```

脚本默认使用当前目录，并会询问部署目录、API 镜像、前端镜像、API 端口和前端端口。回车即可接受默认值：

- API 镜像：`chadwuo/li-ji-api:latest`
- 前端镜像：`chadwuo/li-ji-web:latest`
- API 端口：`8080`
- 前端端口：`80`

确认后脚本会下载 Compose 和业务配置，拉取两个镜像并启动完整服务。部署只将用户头像持久化到宿主机 `wwwroot/oss/avatar/`；邮件模板、导出模板和其他内置资源继续保留在 API 镜像内，不会复制到宿主机。安装完成后访问 `http://服务器IP/`；API 健康检查地址为 `http://服务器IP:8080/health`。

重复执行脚本会保留现有 `.env`、业务配置和新版 Compose 文件。检测到旧版 API-only Compose 时，脚本会先备份为 `docker-compose.yml.backup`，再下载包含前端服务的版本。

## 配置与运维

业务配置位于安装目录的 `Configuration/`，数据库文件、用户头像和日志分别保存在 `data/`、`wwwroot/oss/avatar/` 和 `logs/`。镜像版本和端口可以编辑 `.env` 修改：

```dotenv
LIJI_IMAGE=chadwuo/li-ji-api:v5.0.0
LIJI_WEB_IMAGE=chadwuo/li-ji-web:v5.0.0
LIJI_PORT=8080
LIJI_WEB_PORT=80
```

修改配置或版本后重启：

```bash
cd li-ji-deploy && docker compose pull && docker compose up -d
```

常用操作：

```bash
cd li-ji-deploy && docker compose logs -f       # 查看日志
cd li-ji-deploy && docker compose up -d         # 启动或重启
cd li-ji-deploy && docker compose down          # 停止并移除容器
curl http://127.0.0.1:8080/health              # API 健康检查
```
