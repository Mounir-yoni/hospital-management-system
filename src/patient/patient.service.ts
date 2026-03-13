import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(patientData: any) {
    const newPatient = this.patientRepository.create(patientData);
    return await this.patientRepository.save(newPatient);
  }

  async findAll() {
    
    return await this.patientRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const patient = await this.patientRepository.findOne({ 
      where: { id },
      relations: ['user'] 
    });
    
    if (!patient) {
      throw new NotFoundException(`ملف المريض رقم ${id} غير موجود`);
    }
    return patient;
  }

  async update(id: number, updateData: any) {
    const patient = await this.findOne(id);
    Object.assign(patient, updateData);
    return await this.patientRepository.save(patient);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    
    return await this.patientRepository.softRemove(patient);
  }
}