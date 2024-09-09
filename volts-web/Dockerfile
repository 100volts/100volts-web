# Stage 1: Build the application
FROM node:lts AS build
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Apache HTTPD
FROM httpd:2.4 AS runtime

# Copy the build output to the Apache server's root directory
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80
