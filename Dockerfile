FROM node:4
MAINTAINER kumavis

## setup app dir
RUN mkdir -p /www/
WORKDIR /www/

# install dependencies first (perf hack)
COPY ./package.json /www/package.json
RUN npm install

# copy over app dir
COPY ./ /www/

# run tests
RUN npm run build

# start server
CMD npm start

# expose server
EXPOSE 9000