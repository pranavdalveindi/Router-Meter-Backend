import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRouterEvents1708752001000 implements MigrationInterface {
  name = 'CreateRouterEvents1708752001000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "router_events" (
        "id" SERIAL PRIMARY KEY,
        "device_id" TEXT NOT NULL,
        "timestamp" BIGINT NOT NULL,
        "type" INTEGER NOT NULL,
        "details" JSONB NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_router_events_device_time"
      ON "router_events" ("device_id", "timestamp")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_router_events_device_time"`);
    await queryRunner.query(`DROP TABLE "router_events"`);
  }
}