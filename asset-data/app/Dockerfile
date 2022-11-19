# FROM node:16-alpine

# WORKDIR /usr/app

# COPY package*.json ./

# RUN npm install
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .


FROM node:16-alpine as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /


FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
