# Prepare nginx
FROM nginx:1.16.0-alpine

# Copu compiled React.js Web App
COPY ./build/ /usr/share/nginx/html

# Remove default Nginx config file
RUN rm /etc/nginx/conf.d/default.conf

# Replace with new config file
COPY nginx.conf /etc/nginx/conf.d

# https://github.com/ahsannasir/docker_tut_yt/blob/master/frontend/Dockerfile