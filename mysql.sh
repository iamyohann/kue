#!/bin/sh

docker run --rm -d --name strapi-db -v $(pwd)/data:/var/lib/mysql:z -e MYSQL_DATABASE=strapi -e MYSQL_USER=strapi -e MYSQL_PASSWORD=strapi -e MYSQL_ROOT_PASSWORD=strapi-admin mysql:5.7