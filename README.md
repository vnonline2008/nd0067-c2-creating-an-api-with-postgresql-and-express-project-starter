# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Script on this project:
### This application uses node v16, npm v8, typescript v5, express v4 and postgreSQL v12 
- Install dependencies: **npm install** or **npm i**
- **build**: Build project
- **start**: Build and start the project
- **watch**: Build and start the project in watch mode,
- **db-up**: Running up database migration
- **db-down**: Running down database migration
- **test**: Build, reset test database, then do a migration for test database, then run unit test for test environment.

## Database:
- The first time, you can get authentication by default account (***username: admin, password: postgres, API: /users/auth***) after you run data migration.
- By default, postgreSQL uses port **5432**.
- You can you GUI application to interact with postgreSQL (such as **pgAdmin 4, Postbird**) or command line interface (choose whatever you want).
- **Step1**: Login postgreSQL by root user (postgres/postgres).
- **Step2**: Create database, one for dev/prod, one for test.
- **Step3**: Write SQL statement to create table or you can run the script above to create all table and constraint.

## Environment variable:
- These variables are used to this application. Keep in mind it should be hidden in our application
```
    POSTGRESS_PASSWORD=postgres
    POSTGRESS_USERNAME=postgres
    NODE_ENV=develop
    HOST=localhost
    POSTGRESS_DATABASE_TEST=postgres_test
    POSTGRESS_DATABASE=postgres
    PEPPER=demopepper
    SALT=20
    TOKEN_SECRECT=secretKey
```
