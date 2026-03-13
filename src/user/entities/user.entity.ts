import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  DeleteDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Role } from '../../role/entities/role.entity'; // ⚠️ تأكد من مسار مجلد الأدوار لديك

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ name: 'role_id', type: 'int', nullable: true })
  role_id: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // 💡 الميزة الاحترافية: TypeORM سيتكفل بالحذف الآمن تلقائياً بفضل هذا المزخرف
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  // 💡 العلاقة مع جدول الأدوار (المستخدم له دور واحد)
  @ManyToOne(() => Role, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}