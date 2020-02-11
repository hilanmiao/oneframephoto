# build stage
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org \
    && npm install
COPY . .
RUN npm run build:prod

# production stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# use follow command build image and run your container
# docker build -t oneframephoto/frontend .
# docker run -it -p 8080:80 --rm --name oneframephoto-frontend-container oneframephoto/frontend bash
