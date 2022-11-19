FROM node:16-alpine as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
RUN npm i -s
COPY . /
RUN npm run build
CMD npm start


FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
