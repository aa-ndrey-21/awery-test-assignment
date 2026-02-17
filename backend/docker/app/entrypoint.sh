#!/bin/sh
set -e

cd /var/www/backend

composer install --no-interaction --optimize-autoloader

php artisan key:generate --force --no-interaction
php artisan storage:link --force --no-interaction
php artisan migrate --force --no-interaction
php artisan db:seed --force --no-interaction

php-fpm
