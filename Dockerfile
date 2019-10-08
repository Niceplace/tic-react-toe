FROM node:10-alpine 

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn lint && \
    yarn test:unit && \
    yarn test:acceptance

EXPOSE 3000

CMD ["./node_modules/.bin/ts-node", "-T", "./src/index.ts"]