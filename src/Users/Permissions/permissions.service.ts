import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  // @TODO
  // look how to properly set type fro object (for options everywhere)
  async findAll(options?: object) {
    return await this.permissionRepository.find(options);
  }

  async findOne(id: number, options?: object) {
    return await this.permissionRepository.findOne(id, options);
  }

  async create(createPermissionDto: CreatePermissionDto) {
    return await this.permissionRepository.save(createPermissionDto);
  }

  async remove(id: number) {
    await this.permissionRepository.delete(id);
  }
}
