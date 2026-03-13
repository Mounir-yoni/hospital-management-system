import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ManagerService {
  constructor(private dataSource: DataSource) {}

  async getDashboardStats() {
    // 🪄 استخدام raw queries هنا سريع جداً ويحميك من أخطاء مسارات الملفات!
    const usersCount = await this.dataSource.query('SELECT COUNT(*) FROM users WHERE deleted_at IS NULL');
    const patientsCount = await this.dataSource.query('SELECT COUNT(*) FROM patients WHERE deleted_at IS NULL');
    const doctorsCount = await this.dataSource.query('SELECT COUNT(*) FROM doctors');
    const departmentsCount = await this.dataSource.query('SELECT COUNT(*) FROM departments');

    // إرجاع البيانات كأرقام صحيحة بدلاً من نصوص
    return {
      total_users: parseInt(usersCount[0].count),
      total_patients: parseInt(patientsCount[0].count),
      total_doctors: parseInt(doctorsCount[0].count),
      total_departments: parseInt(departmentsCount[0].count),
    };
  }
}