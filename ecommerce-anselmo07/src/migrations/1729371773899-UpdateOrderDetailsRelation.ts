import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderDetailsRelation1729371773899 implements MigrationInterface {
    name = 'UpdateOrderDetailsRelation1729371773899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderDetails" DROP CONSTRAINT "FK_76d98794a8c9305943ad307b797"`);
        await queryRunner.query(`ALTER TABLE "orderDetails" ADD CONSTRAINT "FK_76d98794a8c9305943ad307b797" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderDetails" DROP CONSTRAINT "FK_76d98794a8c9305943ad307b797"`);
        await queryRunner.query(`ALTER TABLE "orderDetails" ADD CONSTRAINT "FK_76d98794a8c9305943ad307b797" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
