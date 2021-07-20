FROM node:14
ARG DOMAIN_NAME=example.com
WORKDIR /app
COPY ./package.json ./
RUN yarn install && yarn cache clean --force
ENV PATH=/app/node_modules/.bin:$PATH
ENV VUE_APP_API_BASE_URL=https://$DOMAIN_NAME
# Will be overwritten with the contents of src folder when running via docker-compose-dev.yml
WORKDIR /app/src
COPY . .
RUN yarn run build
CMD [ "yarn", "run", "serve" ]
