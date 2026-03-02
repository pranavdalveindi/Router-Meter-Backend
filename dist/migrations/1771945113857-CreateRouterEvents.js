export class CreateRouterEvents1708752001000 {
    name = 'CreateRouterEvents1708752001000';
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "idx_router_events_device_time"`);
        await queryRunner.query(`DROP TABLE "router_events"`);
    }
}
