import { Controller, Get, Redirect } from '@nestjs/common';
import { NoticeService } from '../services/NoticeService';
import { UserService } from '../services/UserService';

@Controller()
export class AdminController {
  constructor(
    private noticeService: NoticeService,
    private userService: UserService,
  ) {}

  @Get('dashboard')
  @Redirect('/noticias')
  panelAdmin(): void {}

  @Get('create-autor')
  autorCreate(): string {
    return 'crearAutor.html';
  }
}
