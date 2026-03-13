import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RadiologistService } from './radiologist.service';

@Controller('radiology')
export class RadiologistController {
  constructor(private readonly radiologistService: RadiologistService) {}

  // --- مسارات الصور ---
  @Post('images')
  addImage(@Body() imageData: any) {
    return this.radiologistService.addImage(imageData);
  }

  @Get('images/patient/:patientId')
  getPatientImages(@Param('patientId') patientId: string) {
    return this.radiologistService.getPatientImages(+patientId);
  }

  // --- 📝 مسار إضافة تقرير طبي ---
  @Post('reports')
  createReport(@Body() reportData: any) {
    return this.radiologistService.createReport(reportData);
  }

  // --- 🎯 مسار إضافة تعليق دقيق على الصورة ---
  @Post('annotations')
  createAnnotation(@Body() annotationData: any) {
    return this.radiologistService.createAnnotation(annotationData);
  }
}