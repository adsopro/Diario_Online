import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Notice } from '../entities/Notice.entity';
import { NoticeService } from '../services/NoticeService';
import { NoticeRepository } from '../repository/NoticeRepository';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('notice')
export class NoticeController {
  constructor(
    private readonly noticeService: NoticeService,
    private readonly noticeRepository: NoticeRepository,
  ) {}

  @Get()
  getAllNotices(): Promise<Notice[]> {
    return this.noticeService.findAll();
  }

  @Get(':id')
  async getNoticeById(@Param('id') id: number): Promise<Notice> {
    const notice = await this.noticeRepository.findOne({
      where: { id: id },
    });

    if (!notice) {
      throw new Error('Notice not found');
    }

    return notice;
  }

  @Post('crear')
  createNotice(@Body() notice: Notice): Promise<Notice> {
    console.log(notice);
    return this.noticeService.create(notice);
  }

  @Put(':id')
  updateNotice(@Param('id') id: number, @Body() notice: Notice): Promise<void> {
    return this.noticeService.update(id, notice);
  }

  @Delete(':id')
  deleteNotice(@Param('id') id: number): Promise<void> {
    return this.noticeService.delete(id);
  }

  @Get('editar/:id')
  async editNotice(@Param('id') id: number): Promise<{ notice: Notice }> {
    return this.noticeService.edit(id);
  }

  @Post('save')
  saveNotice(@Body() notice: Notice) {
    return this.noticeService.create(notice);
  }
}
