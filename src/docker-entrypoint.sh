#!/bin/bash

CMD=$1

# Wait until mysql is ready
until nc -z db 3306; do
    sleep 3
done

case "$CMD" in
    "start" )
        if [ ! -f ./.env ]; then
            echo "No app found! Generating new..."
            composer global require laravel/installer
            PATH="$PATH:/root/.composer/vendor/bin"
            laravel new laravel-project

            echo "Moving project folder (this takes a little time)..."
            cp -Rp ./laravel-project/. .
            rm -rf ./laravel-project

            echo "Activating react"
            php artisan preset react

            echo "Creating database"
            php artisan migrate:fresh
        fi

        echo "Installing composer packages"
        composer global require laravel/installer
        composer install

        echo "Applying migrations"
        php artisan migrate

        # echo "Generating JWT-secret"
        # php artisan jwt:secret

        echo "Start server"
        exec php artisan serve --host=0.0.0.0 --port=8000
        ;;
    * )
        exec $CMD ${@:2}
        ;;
esac

