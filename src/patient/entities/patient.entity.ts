import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, DeleteDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity'; // ⚠️ تأكد من صحة مسار ملف المستخدم لديك

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  user_id: number;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ name: 'blood_type', type: 'varchar', length: 10, nullable: true })
  bloodType: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // 💡 علاقة 1 لـ 1 مع جدول المستخدمين (لجلب الاسم والهاتف والإيميل)
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}