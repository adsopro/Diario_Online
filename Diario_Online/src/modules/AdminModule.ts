import { Module } from '@nestjs/common';
import { AdminController } from '../controllers/AdminController';
import { AdminService } from '../services/AdminService';
import { AdminRepository } from '../repository/AdminRepository';
import { Admin } from '../entities/Admin.entity';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  imports: [Admin],
})
export class AdminModule {}
