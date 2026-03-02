import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRouterUsers1708752000000 implements MigrationInterface {
  name = 'CreateRouterUsers1708752000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "router_users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255) NOT NULL UNIQUE,
        "password_hash" VARCHAR(255) NOT NULL,
        "created_at" TIMESTAMPTZ DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "router_users"`);
  }
}