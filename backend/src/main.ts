import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as _MySQLStore from 'express-mysql-session';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const MySQLStore = _MySQLStore(session);

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: 'http://localhost:3001',
      methods: 'GET,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
  }

  // Could enable this for (early) "production"
  // app.use(express.static(process.cwd() + '/frontend/build'));

  app.use(
    session({
      key: 's',
      secret: process.env.SESSION_COOKIE_SECRET,
      store: new MySQLStore(options),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  fs.writeFileSync(process.env.LOG_FILE, '');

  await app.listen(process.env.APP_PORT);
}
bootstrap();
