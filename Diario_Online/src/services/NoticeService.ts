import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '../entities/Notice.entity';
import { ImageService } from './ImageService';
import { NoticeRepository } from 'src/repository/NoticeRepository';
import { DescripcionInvalidoException } from '../exceptions/notice/DescripcionInvalidoException';
import { TituloInvalidoException } from '../exceptions/notice/TituloInvalidoException';
import { ImagenInvalidoException } from '../exceptions/notice/ImagenInvalidoException';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private NoticeRepository: Repository<Notice>,
    private imageService: ImageService,
  ) {}

  findAll(): Promise<Notice[]> {
    return this.NoticeRepository.find();
  }

  async home(): Promise<Notice[]> {
    const noticias = await this.NoticeRepository.find();
    noticias.sort((n1, n2) => n2.id - n1.id);
    return noticias;
  }

  async getById(id: any): Promise<Notice> {
    const notice = await this.NoticeRepository.findOne(id);
    if (!notice) {
      throw new Error('Notice not found');
    }
    return notice;
  }

  async delete(id: number): Promise<void> {
    const result = await this.NoticeRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Notice not found');
    }
  }

  async edit(id: any): Promise<{ notice: Notice }> {
    const notice = await this.NoticeRepository.findOne(id);
    if (!notice) {
      throw new Error('Notice not found');
    }
    return { notice };
  }

  save(notice: Notice): Promise<Notice> {
    return this.NoticeRepository.save(notice);
  }

  getOne(id: any): Promise<Notice> {
    return this.NoticeRepository.findOne(id);
  }

  async create(notice: Notice): Promise<Notice> {
    return this.NoticeRepository.save(notice);
  }

  async update(id: any, notice: Notice): Promise<void> {
    const resNotice = await this.NoticeRepository.findOne(id);
    if (!resNotice) {
      throw new Error('Notice not found');
    }

    resNotice.titulo = notice.titulo;
    resNotice.cuerpo = notice.cuerpo;

    let image: Image | undefined;
    if (resNotice.imagen) {
      image = await this.imageService.update(
        notice.imagen,
        resNotice.imagen.id,
      );
    } else {
      image = await this.imageService.save(notice.imagen);
    }

    resNotice.imagen = image;

    await this.NoticeRepository.save(resNotice);
  }
}
