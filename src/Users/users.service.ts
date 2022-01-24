import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  // async findOne(id: string, options: any = {}): Promise<User> {
  //   const user = await this.usersRepository.findOne(id);

  //   if (options.hidePermissions) {
  //     delete user.permissionsFor;
  //     delete user.permissionsTo;
  //   }

  //   return user;
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // publicUserDto = new PublicUserDto(createUserDto)

    return await this.usersRepository.save(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    await this.usersRepository.update(id, updateUserDto);
  }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
