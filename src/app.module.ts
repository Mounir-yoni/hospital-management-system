import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { DoctorModule } from './doctor/doctor.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true, // ⚠️ فقط في التطوير
  }), UserModule, RoleModule, DoctorModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
