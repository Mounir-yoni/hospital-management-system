import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { User } from '../../user/entities/user.entity'; // 💡 استدعاء المستخدم

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  user_id: number;

  @Column({ name: 'department_id', type: 'int', nullable: true })
  department_id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  specialization: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // العلاقة مع القسم (تم إضافتها مسبقاً)
  @ManyToOne(() => Department, (department) => department.doctors, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  // 💡 العلاقة مع المستخدم (حساب الطبيب مرتبط بمستخدم واحد)
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}