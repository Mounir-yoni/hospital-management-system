import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleName } from 'src/role/enums/Role.Name';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async create(createUserDto: CreateUserDto, manager?: EntityManager): Promise<User> {
    const userRepository = manager ? manager.getRepository(User) : this.userRepository;
    const roleRepository = manager ? manager.getRepository(Role) : this.roleRepository;

    const existingUser = await userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const { role, ...userData } = createUserDto;
    const roleEntity = await roleRepository.findOne({ where: { name: role as RoleName } });
    if (!roleEntity) {
      throw new Error(`Role ${role} not found`);
    }

    const user: User = userRepository.create({
      name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: roleEntity,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const savedUser = await userRepository.save(user);
    return savedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAll() {
    // جلب كل المستخدمين مع بيانات الصلاحية (Role) الخاصة بهم
    return await this.userRepository.find({ relations: ['role'] });
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