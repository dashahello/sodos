import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCreateRequestDto } from './dto/user.createRequest.dto';
import { UserLoginDto } from './dto/user.login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async verifyUser(userLoginRequest: UserLoginDto): Promise<User> {
    return await this.userRepository.findOne(userLoginRequest);
  }

  async create(userRequest: UserCreateRequestDto): Promise<User> {
    return await this.userRepository.save(userRequest);
  }
}
