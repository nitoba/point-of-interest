<div align='center'>
	<h1>📊 Point of Interest</h1>
	<img src='https://img.shields.io/github/languages/top/nitoba/picpay-challenge' alt='Linguagem mais utilizada' />
	<img src='https://img.shields.io/github/last-commit/nitoba/picpay-challenge' alt='Último commit' />
</div>

## 🚀 Introduction
Solution for the challenge at backend called point of interest.
The requirements for the challenge can be found [here](https://github.com/backend-br/desafios/blob/master/points-of-interest/PROBLEM.md)


## 👨‍💻 Technologies

- [Javascript/Typescript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript): Main programming language.
- [BunJs](https://bun.sh/): Platform to run Javascript
- [SQlite](https://www.sqlite.org/): Relational database to store persistent data.
- [Fastify](https://fastify.dev/): Web framework for building APIs in NodeJS.
- [DrizzleORM](hhttps://orm.drizzle.team/): ORM (Object-Relational Mapping) for communication with the database.

## 🏗️ Design Patterns

The application follows the following design patterns:

1. **Clean Architecture**: The project structure is organized in layers (entities, use cases, interfaces) to separate concerns and facilitate maintenance.

2. **Domain Driven Design (DDD)**: The software design is domain-oriented, focusing on business rules and main entities.

3. **Dependency Injection**: Inversion of control and dependency injection are used to ensure code flexibility and testability.

4. **Automated Testing**: Unit, integration and end-2-end tests are written to ensure code quality.

5. **Asynchronous Communication**: Asynchronous communication within a system brings the possibility of making parts communicate through messages, without waiting for an immediate response.

## 🎯 Main Features

- [x] Search registered points of interest
- [x] Registration of points of interest
- [x] Search for points of interest using filters such as coordinates and distance

## 🔧 Running the project

To run this application, you need to have [BunJs](https://bun.sh/) installed on your machine.

- Run the command `touch .env && cp .env.example .env` to create environment variable files.
- Run the command `bun i` to download the dependencies. You can use the package manager you prefer
- Run the command `bun db:migrate` to apply the migrations to the database.
- Run the command `bun db:seed` to populate the database with some initial data
- Run the command `bun dev` to start the application.
- Open the `client.http` file at the root of the project to call the http route that performs the operation. It is important to have the [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension installed in VsCode

## 🧪 Tests

- Run the command `bun test` to run the unit tests

## ✍🏽 Important learnings
- How to Calculate Distances Between Points Using Mathematics
- Build adapters for http layer decoupling with [Fastify](https://fastify.dev/) and controllers

## 🧑‍💻 Possible improvements
- Use another database to store the data like a Postgres
- Add pipes for request data validation

## 📄 License

This project is under the MIT license. Access the link [LICENSE](https://mit-license.org/) for more details.

## 🌐 GitHub

The source code of the application can be found on GitHub: [Project Link](https://github.com/nitoba/picpay-challenge)

## 📧 Contact

In case of doubts or suggestions, contact us through the email: [nito.ba.dev@gmail.com](mailto:nito.ba.dev@gmail.com).