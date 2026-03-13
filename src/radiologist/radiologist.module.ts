import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadiologistService } from './radiologist.service';
import { RadiologistController } from './radiologist.controller';
import { MedicalImage } from './entities/medical-image.entity';
import { MedicalReport } from './entities/medical-report.entity';
import { ImageAnnotation } from './entities/image-annotation.entity';

@Module({
  // 💡 السر هنا: يجب وضع الكيانات الثلاثة داخل forFeature لكي يراها الـ Service
  imports: [
    TypeOrmModule.forFeature([
      MedicalImage, 
      MedicalReport, 
      ImageAnnotation
    ])
  ],
  controllers: [RadiologistController],
  providers: [RadiologistService],
})
export class RadiologistModule {}