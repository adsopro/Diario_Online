import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
}
