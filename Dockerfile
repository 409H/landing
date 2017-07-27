FROM node:8
MAINTAINER kumavis

## setup app dir
RUN mkdir -p /www/
WORKDIR /www/

# install dependencies first (perf hack)
COPY ./package.json /www/package.json
RUN npm install --production

# copy over app dir
COPY ./dist /www/dist
COPY ./server.js /www/

# start server
CMD npm start

# expose server
EXPOSE 9000