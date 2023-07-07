import { EntityRepository, Repository } from 'typeorm';
import { Image } from '../entities/Image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async findById(id: number): Promise<Image> {
    return this.findOne({ where: { id } });
  }
}
