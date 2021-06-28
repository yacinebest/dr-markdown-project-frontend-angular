# we generate dist folder using 
#ng build --prod
#docker build -t drmarkdown-frontend-angular .
FROM nginx:1.17.1-alpine
COPY /dist/client-drmarkdown /usr/share/nginx/html