import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersOrdersRelation1729379885859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "FK_user_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_user_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
