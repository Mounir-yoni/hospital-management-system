import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctors')
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    specialization: string;

    @Column()
    phone: string;


    @Column()
    department_id: number;


    @OneToOne(() => User, (user) => user.doctor)
    @JoinColumn({ name: 'user_id' })
    user: User;


    @Column({ default: new Date() })
    createdAt: Date;

    @Column({ default: new Date() })
    updatedAt: Date;
}
