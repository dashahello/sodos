import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionRequestnDto } from './dto/permission.request.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findAll(options?: object): Promise<Permission[]> {
    return await this.permissionRepository.find(options);
  }

  async findOne(id?: number, options?: object): Promise<Permission> {
    return await this.permissionRepository.findOne(id, options);
  }

  async count(options?: object): Promise<number> {
    return await this.permissionRepository.count(options);
  }

  async create(
    permissionRequest: PermissionRequestnDto,
    ownerId: number,
    visitorId: number,
  ): Promise<Permission> {
    permissionRequest.ownerId = ownerId;
    permissionRequest.visitorId = visitorId;

    return await this.permissionRepository.save(permissionRequest);
  }

  async remove(id: number): Promise<void> {
    await this.permissionRepository.delete(id);
  }
}
