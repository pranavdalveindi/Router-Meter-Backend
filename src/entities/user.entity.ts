// src/entities/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('router_users') // ✅ changed
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email!: string;

  @Column({ type: 'varchar', name: 'password_hash', nullable: false }) // ✅ fixed mapping
  passwordHash!: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' }) // ✅ consistent naming
  createdAt!: Date;
}

export type SafeUser = Omit<User, 'passwordHash'>;