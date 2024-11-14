# Stage 1: Build Stage
FROM node:lts AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Runtime Stage
FROM httpd:2.4 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 8083
