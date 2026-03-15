import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository, EntityManager } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { RoleName } from 'src/role/enums/Role.Name';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly userService: UserService
  ) { }

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorRepository.manager.transaction(async (manager) => {
      const user = await this.userService.create({
        firstName: createDoctorDto.firstName,
        lastName: createDoctorDto.lastName,
        email: createDoctorDto.email,
        password: createDoctorDto.password,
        role: RoleName.DOCTOR
      }, manager);

      const doctor: Doctor = manager.create(Doctor, createDoctorDto);
      doctor.user = user;
      return await manager.save(doctor);
    });
  }

  findAll() {
    return this.doctorRepository.find({ relations: ['user'] });
  }

  findOne(id: number, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(Doctor) : this.doctorRepository;
    return repo.findOne({ where: { id }, relations: ['user'] });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorRepository.update(id, updateDoctorDto);
  }

  async remove(id: number) {
    return await this.doctorRepository.manager.transaction(async (manager) => {
      const doctor = await this.findOne(id, manager);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      const userId = doctor.user.id;
      await manager.delete(Doctor, id);
      await this.userService.remove(userId, manager);
      return { deleted: true };
    });
  }
}
