FROM node:16-alpine as dependencies
WORKDIR /src
COPY package*.json /
RUN npm install

FROM node:16-alpine as production
ARG TOKEN_SECRET
ARG BACKEND_API

ENV TOKEN_SECRET=$TOKEN_SECRET
ENV BACKEND_API=$BACKEND_API
ENV NODE_ENV production

WORKDIR /src
COPY . .
COPY --from=dependencies /node_modules ./node_modules
RUN npm run build
EXPOSE 3000

FROM dependencies as dev
ARG TOKEN_SECRET
ARG BACKEND_API

ENV TOKEN_SECRET=$TOKEN_SECRET
ENV BACKEND_API=$BACKEND_API
ENV NODE_ENV development

RUN npm install -g nodemon





# FROM node:16-alpine as production
# WORKDIR /src
# ENV NODE_ENV production
# # If you are using a custom next.config.js file, uncomment this line.
# # COPY --from=builder /my-project/next.config.js ./
# COPY --from=builder /src/public ./public
# COPY --from=builder /src/.next ./.next
# COPY --from=builder /src/node_modules ./node_modules
# COPY --from=builder /src/package.json ./package.json
