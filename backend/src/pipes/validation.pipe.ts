import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { validate, ValidationError } from 'class-validator';

import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages: string[] = this.getMessages(errors);
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Unprocessable Entity',
          message: messages.length === 1 ? messages[0] : undefined,
          messages: messages.length > 1 ? this.getMessages(errors) : undefined,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return value;
  }

  private getMessages(errors: ValidationError[] = []): string[] {
    let messages: string[] = [];

    errors.forEach((error) => {
      messages = messages.concat(Object.values(error.constraints));
    });

    return messages;
  }

  private toValidate(metaType): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
  }
}
