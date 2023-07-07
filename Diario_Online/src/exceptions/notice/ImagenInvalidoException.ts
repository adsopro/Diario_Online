import { HttpException, HttpStatus } from '@nestjs/common';

export class ImagenInvalidoException extends HttpException {
  constructor() {
    super('La imagen no puede estar vacía', HttpStatus.BAD_REQUEST);
  }
}
