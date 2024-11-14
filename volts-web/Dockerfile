# Build Stage
FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .

RUN npm run build --prod
FROM httpd:2.4 AS runtime
COPY --from=build /app/dist/your-angular-project-name /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["httpd-foreground"]
