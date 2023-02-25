# FROM node:18.14.2-alpine as build-stage

# WORKDIR /app
# RUN corepack enable

# COPY .npmrc package.json pnpm-lock.yaml ./
# RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
# pnpm i --frozen-lockfile

# COPY . .
# RUN pnpm build

FROM nginx:stable-alpine as production-stage
COPY /dist /usr/share/nginx/html
# COPY --from=build-stage /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
