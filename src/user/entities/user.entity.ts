import { Role } from 'src/role/entities/role.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
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
