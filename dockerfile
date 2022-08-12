FROM node:16.16 AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:16.16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/build ./build
COPY --from=development /usr/src/app/prisma ./prisma/

CMD ["npm", "run", "start:prod"]