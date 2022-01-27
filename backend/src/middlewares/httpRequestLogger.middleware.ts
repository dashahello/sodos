import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class HttpRequestLogger implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const dateAndTime = new Date().toLocaleString('en-US');
    const requestUrl =
      request.protocol + '://' + request.get('host') + request.originalUrl;

    const entry = `date and time: ${dateAndTime}
method: ${request.method}
url: ${requestUrl}
user agent: ${request.get('User-Agent')}
ip: ${request.ip}
- - - - - - - - - - - - - - - - - - \n`;

    fs.appendFile(process.env.LOG_FILE, entry, () => {});

    next();
  }
}
