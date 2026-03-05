import { dataSource } from "../config/database.js";
import { User, type SafeUser } from '../entities/user.entity.js';
import argon2 from 'argon2';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ConflictError, UnauthorizedError } from '../utils/errors.js';

// Recommended: define once at module level
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export class AuthService {
  private userRepo = dataSource.getRepository(User); // ✅ use AppDataSource

  async register({ email, password }: { email: string; password: string }): Promise<SafeUser> {
    const existing = await this.userRepo.findOneBy({
      email: email.toLowerCase().trim(),
    });

    if (existing) {
      throw new ConflictError('Email already exists');
    }

    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    const user = this.userRepo.create({
      email: email.toLowerCase().trim(),
      passwordHash,
    });

    const savedUser = await this.userRepo.save(user);

    const { passwordHash: _, ...safeUser } = savedUser;
    return safeUser;
  }

  async login({ email, password }: { email: string; password: string }): Promise<{ user: SafeUser; token: string }> {
    const user = await this.userRepo.findOneBy({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isValid = await argon2.verify(user.passwordHash, password);
    if (!isValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN ?? '1h' } as SignOptions
    );

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token };
  }

  async findById(id: number): Promise<SafeUser | null> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) return null;

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }
}