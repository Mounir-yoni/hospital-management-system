import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateDoctorDto {
    firstName: string;
    lastName: string;
    specialization: string;
    phone: string;
    department_id: number;
    password: string;
    email: string;
}
