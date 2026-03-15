import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalAuthGuard } from './guards/local_auth/local_auth.guard';
import { LocalStrategis } from './strategise/Local.strategise';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import JWTConfig from './config/JWT.config';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';
@Module({
  imports: [UserModule, PassportModule, JwtModule.register(JWTConfig()),
    ConfigModule.forFeature(JWTConfig),
    RoleModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthGuard, LocalStrategis],
  exports: [AuthService],
})
export class AuthModule { }
