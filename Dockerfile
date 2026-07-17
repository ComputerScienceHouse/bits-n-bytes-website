FROM docker.io/node:22 as node

RUN npm i -g pnpm

WORKDIR /app/
COPY package.json pnpm-workspace.yaml* pnpm-lock.yaml* /app/

RUN pnpm i

COPY . /app/

RUN pnpm run build

RUN pnpm exec node ./node_modules/@axa-fr/react-oidc/bin/copy-service-worker-files.mjs dist

FROM docker.io/nginxinc/nginx-unprivileged

RUN sed -i 's/index  index.html index.htm;/index index.html index.htm; try_files $uri $uri\/ \/index.html;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080

COPY --from=node /app/dist /usr/share/nginx/html