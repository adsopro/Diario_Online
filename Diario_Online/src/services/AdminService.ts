import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './UserService';
import { Admin } from '../entities/Admin.entity';
import { AdminRepository } from '../repository/AdminRepository';

@Injectable()
export class AdminService extends UserService {
  constructor(
    @InjectRepository(Admin)
    private AdminRepository: Repository<Admin>,
  ) {
    super(AdminRepository);
  }
}
