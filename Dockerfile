# building
FROM node:14.14.0-buster-slim AS builder
WORKDIR /app
COPY . .
RUN npm install --loglevel=error --no-audit --progress=false && npm run build

# deploying
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
COPY ./default.conf /etc/nginx/conf.d/default.conf
# USER nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
