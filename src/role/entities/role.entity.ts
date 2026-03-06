
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoleName } from '../enums/Role.Name';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: RoleName;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
