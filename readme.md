version: "3"

services:
  app:
    container_name: test-nodejs
    image: image-nodejs
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - .:/usr/app
      - /usr/app/node_modules