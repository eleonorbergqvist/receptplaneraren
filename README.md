[![CircleCI](https://circleci.com/gh/eleonorbergqvist/receptplaneraren.svg?style=svg)](https://circleci.com/gh/eleonorbergqvist/receptplaneraren)

# Receptplaneraren

This is a recipe app built in Laravel and React.

## Features
- Laravel backend with a REST-based api
- A Docker based development environment (with `php artisan serve`)
- JWT based authentication
- Continious integration with Circle CI
- Frontend built using Create-React-App with Typescript, React, Axios and Redux/Rematch
- Component preview using storybook
- Frontend tests with Jest
- Based on my [laravel-docker-scaffold](https://github.com/eleonorbergqvist/laravel-docker-scaffold) boilerplate
- Error tracking with Sentry

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
- [Laravel tests](https://laravel.com/docs/5.8/http-tests)
- [Jest reference](https://jestjs.io/docs/en/expect)
- [Redux/Rematch](https://rematch.gitbooks.io/rematch/#getting-started)

## Storybook
- cd frontend
- npm run storybook

## License
MIT
