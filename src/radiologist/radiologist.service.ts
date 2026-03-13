import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalImage } from './entities/medical-image.entity';
import { MedicalReport } from './entities/medical-report.entity';
import { ImageAnnotation } from './entities/image-annotation.entity';

@Injectable()
export class RadiologistService {
  constructor(
    @InjectRepository(MedicalImage)
    private readonly medicalImageRepo: Repository<MedicalImage>,
    // 💡 حقن مستودعات التقارير والتعليقات
    @InjectRepository(MedicalReport)
    private readonly medicalReportRepo: Repository<MedicalReport>,
    @InjectRepository(ImageAnnotation)
    private readonly imageAnnotationRepo: Repository<ImageAnnotation>,
  ) {}

  // --- دوال الصور ---
  async addImage(imageData: any) {
    const newImage = this.medicalImageRepo.create(imageData);
    return await this.medicalImageRepo.save(newImage);
  }

  async getPatientImages(patientId: number) {
    return await this.medicalImageRepo.find({
      where: { patient: { id: patientId } },
      relations: ['doctor', 'patient'], 
    });
  }

  // --- 📝 دوال التقارير الطبية ---
  async createReport(reportData: any) {
    const newReport = this.medicalReportRepo.create(reportData);
    return await this.medicalReportRepo.save(newReport);
  }

  // --- 🎯 دوال التعليقات على الصور (Annotations) ---
  async createAnnotation(annotationData: any) {
    const newAnnotation = this.imageAnnotationRepo.create(annotationData);
    return await this.imageAnnotationRepo.save(newAnnotation);
  }
}