import { Module } from '@nestjs/common';
import { ImageController } from '../controllers/ImageController';
import { ImageService } from '../services/ImageService';
import { ImageRepository } from '../repository/ImageRepository';
import { Image } from '../entities/Image.entity';

@Module({
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
  imports: [Image],
})
export class ImageModule {}
