import { EntityRepository, Repository } from 'typeorm';
import { Admin } from '../entities/Admin.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async findByNombre(id: number): Promise<Admin> {
    return this.findOne({ where: { id } });
  }
}
