[![CircleCI](https://circleci.com/gh/eleonorbergqvist/receptplaneraren.svg?style=svg)](https://circleci.com/gh/eleonorbergqvist/receptplaneraren)

# Receptplaneraren

This is a recipe app.

## Features
- MySQL
- Auto migrations on startup
- React activated by default
- Local dev server (with `php artisan serve`)
- A SPA built in create-react-app and typescript
- Continious integration with Circle CI

## Installing
- `cd frontend`
- `npm install`
- `npm run build`
- `cd -`
- Copy laravel config: `cp src/.env.example src/.env`
- Run `docker-compose up`
- Now open [localhost:8000](http://localhost:8000)
- Done!

## References
- https://laravel.com/docs/5.8/http-tests

## Storybook
- cd frontend
- npm run storybook

## License
MIT
