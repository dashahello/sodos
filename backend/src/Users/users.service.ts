import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdateRequestDto } from './dto/user.updateRequest.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number, options?: object): Promise<User> {
    return await this.usersRepository.findOne(id, options);
  }

  async count(options?: object): Promise<number> {
    return await this.usersRepository.count(options);
  }

  async update(id: number, userRequest: UserUpdateRequestDto): Promise<void> {
    if (userRequest.password) {
      await this.usersRepository.update(id, {
        ...userRequest,
        password: await bcrypt.hash(
          userRequest.password,
          parseInt(process.env.PASSWORD_HASH_ROUNDS),
        ),
      });
    } else {
      await this.usersRepository.update(id, userRequest);
    }
  }
}
