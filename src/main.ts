import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fetch from 'node-fetch';
import * as session from 'express-session';
import * as _MySQLStore from 'express-mysql-session';

const MySQLStore = _MySQLStore(session);

// @TODO
// write values to .env
const options = {
  host: 'localhost',
  port: 3306,
  user: 'dasha2',
  password: '123',
  database: 'todo',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sessionStore = new MySQLStore(options);

  app.use(
    session({
      key: 'session_cookie_name',
      secret: 'session_cookie_secret',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.setGlobalPrefix('api');

  await app.listen(process.env.APP_PORT);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import fetch from 'node-fetch';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.setGlobalPrefix('api');

//   await app.listen(3000);

//   // @TODO just for dev for now :)
//   // import fetch from 'node-fetch';

//   await (async () => {
//     const users = await (await fetch('http://localhost:3000/api/users')).json();
//     console.log('users', users);
//   })();

//   await (async () => {
//     const postedUser = await (
//       await fetch('http://localhost:3000/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: 'Sam',
//           email: 'sam@sss.ss',
//           password: '123',
//           status: 'Hello World!',
//         }),
//       })
//     ).json();
//     console.log('postedUser', postedUser);
//   })();

//   await (async () => {
//     const postedUser = await (
//       await fetch('http://localhost:3000/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: 'Dasha',
//           email: 'daa@sss.ss',
//           password: '123',
//           status: 'Hello Dasha!',
//         }),
//       })
//     ).json();
//     console.log('postedUser', postedUser);
//   })();

//   await (async () => {
//     const users = await (await fetch('http://localhost:3000/api/users')).json();
//     console.log('users', users);
//   })();

//   await (async () => {
//     const users = await (await fetch('http://localhost:3000/api/users')).json();
//     console.log('users', users);

//     const postedTask = await (
//       await fetch(`http://localhost:3000/api/users/${users[0].id}/tasks`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           status: 'PRIVATE',
//           title: 'Hello title',
//           description: 'Description Lorem Ipsum...',
//           done: false,
//         }),
//       })
//     ).json();
//     console.log('postedTask', postedTask);
//   })();

//   await (async () => {
//     const users = await (await fetch('http://localhost:3000/api/users')).json();

//     const tasksForUser = await (
//       await fetch(`http://localhost:3000/api/users/${users[0].id}/tasks`)
//     ).json();
//     console.dir(tasksForUser, { depth: null });
//   })();
// }
// bootstrap();
