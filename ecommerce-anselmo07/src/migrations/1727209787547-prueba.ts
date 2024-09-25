import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba1727209787547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE users SET password = 'defaultPassword' WHERE password IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
