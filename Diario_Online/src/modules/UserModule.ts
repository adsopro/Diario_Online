import { Module } from '@nestjs/common';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entities/User.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [User],
})
export class UserModule {}
