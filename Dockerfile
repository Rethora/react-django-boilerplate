FROM node:20-alpine as build

WORKDIR /frontend
COPY ./frontend/yarn.lock ./
RUN yarn install
COPY ./frontend/ ./
RUN yarn build

FROM nginx:latest

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/dist /usr/share/nginx/html