import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id); // استخدام + لتحويل النص إلى رقم
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
  @Get(':id/doctors')
  getDoctorsByDepartment(@Param('id') id: string) {
    return this.departmentsService.getDoctorsInDepartment(+id);
  }
  @Post(':id/add-doctor/:doctorId')
  addDoctorToDepartment(@Param('id') id: string, @Param('doctorId') doctorId: string) {
    return this.departmentsService.addDoctorToDepartment(+id, +doctorId);
  }
  @Delete(':id/remove-doctor/:doctorId')
  removeDoctorFromDepartment(@Param('id') id: string, @Param('doctorId') doctorId: string) {
    return this.departmentsService.deleteDoctorFromDepartment(+id, +doctorId);
  }
}