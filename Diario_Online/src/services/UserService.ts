import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import * as bcrypt from 'bcrypt';
import { NombreInvalidoException } from '../exceptions/user/NombreInvalidoException';
import { ApellidoInvalidoException } from '../exceptions/user/ApellidoInvalidoException';
import { EmailInvalidoException } from '../exceptions/user/EmailInvalidoException';
import { PasswordInvalidoException } from '../exceptions/user/PasswordInvalidoException';
import { Password2InvalidoException } from '../exceptions/user/Password2InvalidoException';
import { Rol } from '../enums/Rol';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.UserRepository.find();
  }

  async getById(id: number): Promise<User> {
    return this.UserRepository.findOne({ where: { id } });
  }

  async update(user: User): Promise<void> {
    await this.UserRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.UserRepository.delete(id);
  }

  async save(user: User): Promise<User> {
    return this.UserRepository.save(user);
  }

  async registrar(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    password2: string,
  ): Promise<void> {
    this.validar(nombre, apellido, email, password, password2);
    const usuario = new User();
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.password = await bcrypt.hash(password, 10);
    usuario.rol = Rol.USER;
    await this.UserRepository.save(usuario);
  }

  private validar(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    password2: string,
  ): void {
    if (!nombre || nombre.trim() === '') {
      throw new NombreInvalidoException();
    }

    if (!apellido || apellido.trim() === '') {
      throw new ApellidoInvalidoException();
    }

    if (!email || email.trim() === '') {
      throw new EmailInvalidoException();
    }

    if (!password || password.length <= 5) {
      throw new PasswordInvalidoException();
    }

    if (password !== password2) {
      throw new Password2InvalidoException();
    }
  }

  async loadUserByUsername(username: string): Promise<JwtPayload> {
    const user = await this.UserRepository.findOne({
      where: { email: username },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const userDetails: JwtPayload = {
      sub: user.id.toString(),
      username: user.nombre,
      roles: user.rol,
    };

    return userDetails;
  }
}
