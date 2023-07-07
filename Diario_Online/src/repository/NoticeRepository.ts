import { EntityRepository, Repository } from 'typeorm';
import { Notice } from '../entities/Notice.entity';

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  async findById(id: number): Promise<Notice> {
    return this.findOne({ where: { id } });
  }
}
