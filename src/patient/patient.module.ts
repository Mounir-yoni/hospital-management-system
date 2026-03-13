import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './entities/patient.entity'; // 💡 الاستدعاء

@Module({
  imports: [TypeOrmModule.forFeature([Patient])], // 💡 تسجيل الكيان
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}