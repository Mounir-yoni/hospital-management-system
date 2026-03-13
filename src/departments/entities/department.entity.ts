import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity'; // تأكد من مسار مجلد الأطباء

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // العلاقة: القسم الواحد يمكن أن يحتوي على عدة أطباء
  @OneToMany(() => Doctor, (doctor) => doctor.department)
  doctors: Doctor[];
}