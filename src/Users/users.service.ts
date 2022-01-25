import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateUserDto } from './Auth/dto/user-signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    // { select: ['id'] }
    return await this.usersRepository.find();

    // for (let user of users) {
    // delete user.permissionsFor;
    // }
  }

  // @TODO
  // id type ?
  // async findOne(id: string): Promise<User> {
  //   return await this.usersRepository.findOne(id);
  // }

  async findOne(id: any, options?: any): Promise<User> {
    // const user = await this.usersRepository.findOne(id, options);

    // const t = await this.usersRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.permissionsFor', 'pemission')
    //   // .leftJoinAndSelect('user.permissionsFor', 'permission')
    //   .where('user.id = :userId', { userId: id })
    //   .select(['user', 'pemission'])
    //   .getOne();

    // if (options.hidePermissions) {
    //   delete user.permissionsFor;
    //   delete user.permissionsTo;
    // }

    // return user;

    // console.log('RESULT', t);

    // return t;

    return await this.usersRepository.findOne(id, options);
  }

  async count(options?: object) {
    return await this.usersRepository.count(options);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    await this.usersRepository.update(id, updateUserDto);
  }
}
