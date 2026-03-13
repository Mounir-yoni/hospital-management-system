import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity('medical_images')
export class MedicalImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_type', type: 'varchar', length: 100, nullable: true })
  imageType: string;

  @Column({ name: 'body_part', type: 'varchar', length: 100, nullable: true })
  bodyPart: string;

  @Column({ name: 'image_path', type: 'varchar', length: 255, nullable: true })
  imagePath: string; // مسار حفظ الصورة في السيرفر أو السحابة

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'upload_date' })
  uploadDate: Date;

  // 🔗 العلاقة الأولى: ربط الصورة بالمريض
  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  // 🔗 العلاقة الثانية: ربط الصورة بطبيب/فني الأشعة
  @ManyToOne(() => Doctor, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;
}