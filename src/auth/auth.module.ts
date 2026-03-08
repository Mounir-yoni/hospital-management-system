import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalAuthGuard } from './guards/local_auth/local_auth.guard';
import { LocalStrategis } from './strategise/Local.strategise';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthGuard, LocalStrategis],
  exports: [AuthService],
})
export class AuthModule { }
