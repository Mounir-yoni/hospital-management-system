import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { Doctor } from '../doctor/entities/doctor.entity'; // لاستخدامه في ربط الأطباء

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>, // حقن جدول الأطباء
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const newDepartment = this.departmentRepository.create(createDepartmentDto);
    return await this.departmentRepository.save(newDepartment);
  }

  async findAll() {
    return await this.departmentRepository.find();
  }

  async findOne(id: number) {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException(`القسم رقم ${id} غير موجود`);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.findOne(id);
    Object.assign(department, updateDepartmentDto);
    return await this.departmentRepository.save(department);
  }

  async remove(id: number) {
    const department = await this.findOne(id);
    return await this.departmentRepository.remove(department);
  }

  // --- دوال العلاقات مع الأطباء ---

  async getDoctorsInDepartment(departmentId: number) {
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
      relations: ['doctors'], // جلب الأطباء المرتبطين بهذا القسم
    });
    if (!department) {
      throw new NotFoundException(`القسم رقم ${departmentId} غير موجود`);
    }
    return department.doctors;
  }

  async addDoctorToDepartment(departmentId: number, doctorId: number) {
    const doctor = await this.doctorRepository.findOne({ where: { id: doctorId } });
    if (!doctor) {
      throw new NotFoundException(`الطبيب رقم ${doctorId} غير موجود`);
    }
    doctor.department_id = departmentId;
    return await this.doctorRepository.save(doctor);
  }

  async deleteDoctorFromDepartment(departmentId: number, doctorId: number) {
    const doctor = await this.doctorRepository.findOne({ where: { id: doctorId } });
    if (!doctor || doctor.department_id !== departmentId) {
      throw new NotFoundException(`الطبيب غير موجود في هذا القسم`);
    }
    doctor.department_id = null as any; // إزالة ارتباطه بالقسم
    return await this.doctorRepository.save(doctor);
  }
}