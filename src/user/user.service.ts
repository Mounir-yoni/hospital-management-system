import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { RoleName } from 'src/role/enums/Role.Name';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const { role, ...userData } = createUserDto;
    const roleEntity = await this.roleRepository.findOne({ where: { name: role as RoleName } });
    if (!roleEntity) {
      throw new Error(`Role ${role} not found`);
    }

    const user: User = this.userRepository.create({
      ...userData,
      role: roleEntity,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { role, ...rest } = updateUserDto;
    const updateData: any = { ...rest };
    if (role) {
      const roleEntity = await this.roleRepository.findOne({ where: { name: role as RoleName } });
      if (!roleEntity) {
        throw new Error(`Role ${role} not found`);
      }
      updateData.role = roleEntity;
    }
    updateData.updatedAt = new Date();
    return this.userRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
