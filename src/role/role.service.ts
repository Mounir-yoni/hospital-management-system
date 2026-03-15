import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleName } from './enums/Role.Name';
@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) { }
    async getRoleByName(name: string) {
        return await this.roleRepository.findOne({ where: { name: RoleName[name] } });
    }

    async getRoleById(id: number) {
        return await this.roleRepository.findOne({ where: { id } });
    }
}
