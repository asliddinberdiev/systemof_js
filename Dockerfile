FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/.output ./.output

EXPOSE 4000
CMD ["node", ".output/server/index.mjs"]
