import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { DoctorModule } from './doctor/doctor.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { RadiologistModule } from './radiologist/radiologist.module';
import { ManagerModule } from './manager/manager.module';
import * as dotenv from 'dotenv';
import { DepartmentsModule } from './departments/departments.module';

dotenv.config({ path: 'config.env' });
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',       // 💡 تم وضع الاسم مباشرة
    password: 'Pfe2026',       // 💡 تم وضع كلمة المرور مباشرة
    database: 'hospitall_db',
    autoLoadEntities: true,
    synchronize: true, // ⚠️ فقط في التطوير
  }), UserModule, RoleModule, DoctorModule, AuthModule, PatientModule, RadiologistModule, ManagerModule, DepartmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
