import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {

  private departments: Department[] = [];
  private idCounter = 1;

  create(createDepartmentDto: CreateDepartmentDto) {
    const newDepartment: Department = {
      id: this.idCounter++,
      ...createDepartmentDto,
    };
    this.departments.push(newDepartment);
    return newDepartment;
  }

  findAll() {
    return this.departments;
  }

  findOne(id: number) {
    const department = this.departments.find(dep => dep.id === id);
    if (!department) {
      throw new NotFoundException(`القسم صاحب الرقم ${id} غير موجود`);
    }
    return department;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const index = this.departments.findIndex(dep => dep.id === id);
    if (index === -1) {
      throw new NotFoundException(`القسم صاحب الرقم ${id} غير موجود`);
    }
    
    this.departments[index] = {
      ...this.departments[index],
      ...updateDepartmentDto,
    };
    return this.departments[index];
  }

  remove(id: number) {
    const index = this.departments.findIndex(dep => dep.id === id);
    if (index === -1) {
      throw new NotFoundException(`القسم صاحب الرقم ${id} غير موجود`);
    }
    
    const deletedDepartment = this.departments.splice(index, 1);
    return deletedDepartment[0];
  }
  //add doctor to department
  addDoctorToDepartment(departmentId: number, doctorId: number) {
    const department = this.departments.find(dep => dep.id === departmentId);
    if (!department) {
      throw new NotFoundException(`القسم صاحب الرقم ${departmentId} غير موجود`);
    }
    // Here you would typically add the doctor to the department's list of doctors
    // For example: department.doctors.push(doctorId);
  }
  getDoctorsInDepartment(departmentId: number) {
    const department = this.departments.find(dep => dep.id === departmentId);
    if (!department) {
      throw new NotFoundException(`القسم صاحب الرقم ${departmentId} غير موجود`);
    }
    // Here you would typically return the list of doctors in the department
    // For example: return department.doctors;
  }
  deleteDoctorFromDepartment(departmentId: number, doctorId: number) {
    const department = this.departments.find(dep => dep.id === departmentId);
    if (!department) {
      throw new NotFoundException(`القسم صاحب الرقم ${departmentId} غير موجود`);
    }
    // Here you would typically remove the doctor from the department's list of doctors
    // For example: department.doctors = department.doctors.filter(id => id !== doctorId);
  }

}