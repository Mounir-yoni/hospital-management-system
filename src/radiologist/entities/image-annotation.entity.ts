import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MedicalImage } from './medical-image.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity('image_annotations')
export class ImageAnnotation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'x_coordinate', type: 'float', nullable: true })
  xCoordinate: number;

  @Column({ name: 'y_coordinate', type: 'float', nullable: true })
  yCoordinate: number;

  @Column({ type: 'float', nullable: true })
  width: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'text', nullable: true })
  comment: string; // التعليق على هذا الجزء المحدد من الصورة

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // 🔗 ربط التعليق بصورة الأشعة
  @ManyToOne(() => MedicalImage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medical_image_id' })
  medicalImage: MedicalImage;

  // 🔗 ربط التعليق بالطبيب الذي أضافه
  @ManyToOne(() => Doctor, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;
}