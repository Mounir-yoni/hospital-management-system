import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MedicalImage } from './medical-image.entity';
import { Doctor } from '../../doctor/entities/doctor.entity'; // تأكد من المسار

@Entity('medical_reports')
export class MedicalReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  findings: string; // النتائج والملاحظات

  @Column({ type: 'text', nullable: true })
  conclusion: string; // الخلاصة

  @Column({ type: 'text', nullable: true })
  recommendations: string; // التوصيات الطبية

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // 🔗 ربط التقرير بصورة الأشعة الأساسية
  @ManyToOne(() => MedicalImage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medical_image_id' })
  medicalImage: MedicalImage;

  // 🔗 ربط التقرير بالطبيب/الفني الذي كتبه
  @ManyToOne(() => Doctor, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;
}