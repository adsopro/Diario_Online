import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { NoticeModule } from './NoticeModule';
import { UserModule } from './UserModule';
import { Notice } from '../entities/Notice.entity';
import { NoticeService } from '../services/NoticeService';
import { JwtAuthGuard } from '../modules/Jwt-auth.guard';
import { User } from '../entities/User.entity';
import { UserService } from '../services/UserService';
import { Image } from '../entities/Image.entity';
import { Admin } from '../entities/Admin.entity';
import { NoticeController } from '../controllers/NoticeController';
import { UserController } from '../controllers/UserController';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from './AdminModule';
import { AdminService } from 'src/services/AdminService';
import { AdminController } from 'src/controllers/AdminController';
import { ImageModule } from './ImageModule';
import { ImageService } from '../services/ImageService';
import { ImageController } from 'src/controllers/ImageController';
import { Repository } from 'typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([
      Notice,
      User,
      Image,
      Admin,
      NoticeModule,
      UserModule,
      ImageModule,
      AdminModule,
    ]),
  ],
  controllers: [
    NoticeController,
    UserController,
    ImageController,
    AdminController,
  ],
  providers: [
    NoticeService,
    JwtAuthGuard,
    UserService,
    JwtService,
    ImageService,
    AdminService,
  ],
})
export class AppModule {}
