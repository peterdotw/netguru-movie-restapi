# Netguru Movie REST API

Example REST API built for Netguru.

## Built With

- [Express](https://expressjs.com/) - Framework for Node.js
- [TypeORM](https://typeorm.io/#/) - Amazing ORM for TypeScript and JavaScript (ES7, ES6, ES5)
- [Mocha](https://mochajs.org/) - the fun, simple, flexible JavaScript test framework

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Node.js

### Installing

Clone a repository:

```
git clone https://github.com/peterdotw/netguru-movie-restapi.git
```

Rename .env.example file to .env and add your credentials to .env file:

```
cd netguru-movie-restapi
mv .env.example .env
```

Install all dependencies:

```
npm install
```

Build and run an app:

```
npm run dev
```

Run tests:

```
npm run test
```

### Using API

GET /movies

POST /movies

```
{
  "title": "example movie"
}
```

GET /comments

POST /comments

```
{
    "comment": "example comment",
    "movie": "example movie"
}
```

## Note about deployed app

Heroku always puts the server to sleep after 30 minutes of last activity so it can load 1-2 minutes at the first time You visit my app on Heroku.