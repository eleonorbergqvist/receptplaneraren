[![CircleCI](https://circleci.com/gh/eleonorbergqvist/receptplaneraren.svg?style=svg)](https://circleci.com/gh/eleonorbergqvist/receptplaneraren)

# Receptplaneraren

This is a recipe app built in Laravel and React.

## Features
- Laravel backend with a REST-based api
- A Docker based development environment (with `php artisan serve`)
- JWT based authentication
- Continious integration with Circle CI
- Frontend built using Create-React-App with Typescript, React, Formik, Axios and Redux/Rematch
- Component preview using storybook
- Frontend tests with Jest
- Based on my [laravel-docker-scaffold](https://github.com/eleonorbergqvist/laravel-docker-scaffold) boilerplate
- Error tracking with Sentry
- File storage using AWS S3
- A OCR reading service using my [serverless-ocr-scanner](https://github.com/eleonorbergqvist/serverless-ocr-scanner)

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

## Api Documentation

- Docs can be found [here](https://receptplaneraren-staging.herokuapp.com/docs/index.html)
- How to generate new docs: `php artisan apidoc:generate`

## License
MIT
