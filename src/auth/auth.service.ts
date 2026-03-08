import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,) { }

  async ValidateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    console.log(user);
    console.log(password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

  async Register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const savedUser = await this.userService.create({ ...createUserDto, password: hashedPassword });
    return savedUser;
  }


}
