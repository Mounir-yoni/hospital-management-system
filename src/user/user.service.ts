import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: any) {
    // 💡 ملاحظة: في المشاريع الحقيقية نقوم بتشفير كلمة المرور هنا قبل حفظها
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ 
      where: { email },
      relations: ['role'] // جلب صلاحيات المستخدم مفيد جداً وقت تسجيل الدخول
    });
  }
  
  async findAll() {
    // جلب كل المستخدمين مع بيانات الصلاحية (Role) الخاصة بهم
    return await this.userRepository.find({ relations: ['role'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ 
      where: { id },
      relations: ['role'] 
    });
    
    if (!user) {
      throw new NotFoundException(`المستخدم رقم ${id} غير موجود`);
    }
    return user;
  }

  async update(id: number, updateData: any) {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    // 🪄 الميزة السحرية: softRemove ستقوم بتسجيل تاريخ الحذف فقط ولن تحذف السطر فعلياً!
    return await this.userRepository.softRemove(user);
  }
}