FROM node:latest as build-step

RUN mkdir /app
WORKDIR /app

COPY ["package*.json", "yarn.lock", "./"]

RUN yarn install

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

ARG REACT_APP_URL
ENV REACT_APP_URL=$REACT_APP_URL

ENV NODE_OPTIONS --openssl-legacy-provider

COPY . .
RUN yarn run build

FROM nginx:latest
COPY --from=build-step /app/build /usr/share/nginx/html

# CMD [ "yarn", "start" ]
# FROM nginx:latest
# COPY --from=build-step /app/build /usr/share/nginx/html
# # Remove the default NGINX configuration (if any) and copy custom NGINX config
# RUN rm /etc/nginx/conf.d/default.conf
# COPY /app/nginx.conf /etc/nginx/conf.d

# # Expose port 80 for incoming traffic
# EXPOSE 80

# Start NGINX when the container runs
# CMD ["nginx", "-g", "daemon off;"]
