import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './types/payload';
import RefreshJWT from './config/JWT.config';
import * as config from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    @Inject(RefreshJWT.KEY) private refreshJWT: config.ConfigType<typeof RefreshJWT>,
  ) { }

  async ValidateUser(email: string, pas: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(pas, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
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

  async CreateJWT(userId: string, email: string, role: string) {
    const payload: Payload = {
      userId,
      email,
      role,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshtoken = await this.jwtService.signAsync(payload, {
      expiresIn: this.refreshJWT.signOptions?.expiresIn,
      secret: this.refreshJWT.secret as string
    });

    return { accessToken, refreshtoken };
  }


  async Login(user: User) {
    const role = await this.roleService.getRoleById(user.role.id);
    if (!role) {
      throw new Error('Role not found');
    }
    const tokens = await this.CreateJWT(user.id.toString(), user.email, role.name);
    user.refreshToken = tokens.refreshtoken;
    user.updatedAt = new Date();
    await this.userService.update(user.id, { refreshToken: tokens.refreshtoken, updatedAt: new Date(), isActive: true });
    return tokens;
  }
  /*
    async RefreshAccessToken(refreshToken: string) {
      const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.refreshJWT.secret as string
      });
      const user = await this.userService.findByEmail(decodedToken.email);
      if (!user) {
        throw new Error('User not found');
      }
      const tokens = await this.CreateJWT(user.id.toString(), user.email, user.role.name);
      user.refreshToken = tokens.refreshtoken;
      user.updatedAt = new Date();
      await this.userService.update(user.id, { refreshToken: tokens.refreshtoken, updatedAt: new Date() });
      return tokens;
    }*/
}
