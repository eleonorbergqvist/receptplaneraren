FROM php:7.2-fpm

WORKDIR /app
ADD . /app/

RUN apt-get update \
    && apt-get install -y zlib1g-dev mysql-client netcat \
    && docker-php-ext-install zip pdo_mysql

RUN curl -O "https://getcomposer.org/composer.phar" \
    && mv composer.phar /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer
    
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["start"]