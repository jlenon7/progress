FROM node:14-alpine

WORKDIR /node-app

ARG NPM_AUTH_PKG

# ------------------------------------------
# copy content
# ------------------------------------------
COPY . .

RUN echo "//npm.pkg.github.com/:_authToken=${NPM_AUTH_PKG}" > .npmrc
RUN echo "@secjs:registry=https://npm.pkg.github.com/" >> .npmrc

RUN yarn
RUN rm .npmrc

ADD . /node-app

RUN yarn build
