import { dataSource } from '../config/database.js';
import { SafeUser, User } from '../entities/user.entity.js';

export class UserRepository {
  private repo = dataSource.getRepository(User);

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOneBy({ email: email.toLowerCase().trim() });
  }

  async findById(id: number): Promise<SafeUser | null> {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;
    const { passwordHash, ...safe } = user;
    return safe;
  }

  async save(user: User): Promise<User> {
    return this.repo.save(user);
  }
}