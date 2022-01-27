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
  database: 'sodos',
};

// console.log(process.env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: 'http://localhost:3001',
      methods: 'GET,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
  }

  // app.use(express.static(process.cwd() + '/frontend/build'));

  app.use(
    session({
      key: 's',
      // @TODO
      // secret should come from .env
      secret: 'something_not_so_secure',
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
