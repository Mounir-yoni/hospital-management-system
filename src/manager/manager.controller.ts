import { Controller, Get } from '@nestjs/common';
import { ManagerService } from './manager.service';

@Controller('manager') // المسار الأساسي
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  // مسار لوحة تحكم المدير
  @Get('dashboard')
  getDashboard() {
    return this.managerService.getDashboardStats();
  }
}