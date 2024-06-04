FROM node:latest as build-step

RUN mkdir /app
WORKDIR /app

COPY ["package*.json", "yarn.lock", "./"]
RUN yarn install

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

ARG REACT_APP_URL
ENV REACT_APP_URL=$REACT_APP_URL

COPY . .
RUN yarn run build

FROM nginx:latest
COPY --from=build-step /app/build /usr/share/nginx/html
