import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Doctor])], // تأكد من إضافة Doctor هنا لتمكين العلاقات
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [TypeOrmModule.forFeature([Department])],
})
export class DepartmentsModule { }
