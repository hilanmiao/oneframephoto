# build stage
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org \
    && npm install --production
# alinode
RUN npm install nodeinstall -g \
    && nodeinstall --install-alinode ^3
COPY . .
EXPOSE 7001
CMD ["npm", "run", "start;"]

# use follow command build image and run your container
# docker build -t oneframephoto/backend .
# docker run -it -p 8081:7001 --rm --name oneframephoto-backend-container oneframephoto/backend bash
