import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctors')
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    specialization: string;

    @Column()
    phone: string;


    @Column()
    department_id: number;

    @OneToOne(() => User, (user) => user.doctor)
    user: User;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
