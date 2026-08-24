FROM node:22-alpine AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

COPY package.json .npmrc .nvmrc ./
RUN pnpm install --no-frozen-lockfile

COPY . .

# H5 uses same-origin requests; Nginx proxies /api/ to the API container.
ARG VITE_SERVICE_URL=
ENV VITE_SERVICE_URL=${VITE_SERVICE_URL}

RUN pnpm build \
  && test -f dist/build/h5/index.html

FROM nginx:1.27-alpine AS runtime

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/build/h5 /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
