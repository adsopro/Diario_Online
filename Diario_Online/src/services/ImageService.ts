import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities/Image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async save(archivo: any, id?: any): Promise<Image> {
    if (archivo) {
      try {
        let image: Image;

        if (id) {
          const respuesta = await this.imageRepository.findOne(id);
          if (respuesta) {
            image = respuesta;
          } else {
            throw new Error('Imagen no encontrada');
          }
        } else {
          image = new Image();
        }

        image.mime = archivo.mimetype;
        image.nombre = archivo.name;
        image.contenido = archivo.data;

        return this.imageRepository.save(image);
      } catch (error) {
        console.error(error.message);
        throw new Error('Error al guardar o actualizar la imagen');
      }
    }
    throw new Error('Archivo inválido');
  }

  async update(archivo: any, id?: number): Promise<Image> {
    return this.save(archivo, id);
  }

  async delete(id: any): Promise<void> {
    const image = await this.imageRepository.findOne(id);
    if (image) {
      await this.imageRepository.remove(image);
    } else {
      throw new Error('Imagen no encontrada');
    }
  }
}
