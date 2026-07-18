FROM node:25-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy only what the build needs — explicit to avoid pulling in build-system files
COPY config.json ./
COPY engine/ ./engine/
COPY templates/ ./templates/
COPY posts/ ./posts/
COPY static/ ./static/

RUN npm run build

FROM nginx:alpine AS runtime

COPY --from=builder /app/_site /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

