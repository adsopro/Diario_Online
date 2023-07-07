import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { NoticeService } from '../services/NoticeService';
import { UserService } from '../services/UserService';

@Controller('imagen')
export class ImageController {
  constructor(
    private noticeService: NoticeService,
    private userService: UserService,
  ) {}

  @Get('noticia/:id')
  async imagenNoticia(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    const noticia = await this.noticeService.getOne(id);
    const imagen = noticia.imagen.contenido;

    res.set('Content-Type', 'image/jpeg');
    res.send(imagen);
  }
}
