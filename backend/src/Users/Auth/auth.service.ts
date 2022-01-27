import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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
    const userWithHash = await this.userRepository
      .createQueryBuilder('user')
      .where('username = :username', { username: userLoginRequest.username })
      .select(['user.password'])
      .getOne();

    if (
      !userWithHash ||
      !(await bcrypt.compare(userLoginRequest.password, userWithHash.password))
    ) {
      throw new UnauthorizedException('Incorrect credentials');
    }
    return await this.userRepository.findOne({
      username: userLoginRequest.username,
    });
  }

  async create(userRequest: UserCreateRequestDto): Promise<User> {
    return await this.userRepository.save({
      ...userRequest,
      password: await bcrypt.hash(
        userRequest.password,
        parseInt(process.env.PASSWORD_HASH_ROUNDS),
      ),
    });
  }
}
