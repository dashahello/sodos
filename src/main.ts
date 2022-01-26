import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import fetch from 'node-fetch';
import * as session from 'express-session';
import * as _MySQLStore from 'express-mysql-session';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as cors from 'cors';

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

// console.log(process.env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(express.static(process.cwd() + '/frontend/build'));

  app.use(
    session({
      key: 'session_cookie_name',
      secret: 'session_cookie_secret',
      store: new MySQLStore(options),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.APP_PORT);
}
bootstrap();
