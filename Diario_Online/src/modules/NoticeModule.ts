import { Module } from '@nestjs/common';
import { NoticeController } from '../controllers/NoticeController';
import { NoticeService } from '../services/NoticeService';
import { NoticeRepository } from '../repository/NoticeRepository';
import { Notice } from '../entities/Notice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [NoticeController],
  providers: [NoticeService, NoticeRepository],
  imports: [TypeOrmModule.forFeature([Notice])],
})
export class NoticeModule {}
