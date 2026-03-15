import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Role } from '../../role/entities/role.entity'; // ⚠️ تأكد من مسار مجلد الأدوار لديك
import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

}
