import { HttpException, HttpStatus } from '@nestjs/common';

export class DescripcionInvalidoException extends HttpException {
  constructor() {
    super('El precio no puede ser nulo o estar vacío', HttpStatus.BAD_REQUEST);
  }
}
