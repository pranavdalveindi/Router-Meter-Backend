import { dataSource } from '../config/database.js';
import { User } from '../entities/user.entity.js';
export class UserRepository {
    repo = dataSource.getRepository(User);
    async findByEmail(email) {
        return this.repo.findOneBy({ email: email.toLowerCase().trim() });
    }
    async findById(id) {
        const user = await this.repo.findOneBy({ id });
        if (!user)
            return null;
        const { passwordHash, ...safe } = user;
        return safe;
    }
    async save(user) {
        return this.repo.save(user);
    }
}
