export class CreateRouterUsers1708752000000 {
    name = 'CreateRouterUsers1708752000000';
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "router_users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255) NOT NULL UNIQUE,
        "password_hash" VARCHAR(255) NOT NULL,
        "created_at" TIMESTAMPTZ DEFAULT now()
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "router_users"`);
    }
}
