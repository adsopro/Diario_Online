import { HttpException, HttpStatus } from '@nestjs/common';

export class TituloInvalidoException extends HttpException {
  constructor() {
    super(
      'La descripción no puede ser nula o estar vacía',
      HttpStatus.BAD_REQUEST,
    );
  }
}
