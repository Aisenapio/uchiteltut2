FROM nginx:alpine

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Удаляем дефолтный конфиг
RUN rm -f /etc/nginx/conf.d/default.conf

# Запускаем nginx
CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]