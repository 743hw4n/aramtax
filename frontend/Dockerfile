# base
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

# dev stage
FROM base AS dev

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# builder stage (prod용 빌드)
FROM base AS builder

RUN npm ci

COPY . .

RUN npm run build

# prod stage
FROM nginx:alpine AS prod

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]