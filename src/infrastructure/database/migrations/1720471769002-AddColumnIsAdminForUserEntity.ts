import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnIsAdminForUserEntity1720471769002 implements MigrationInterface {
    name = 'AddColumnIsAdminForUserEntity1720471769002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
    }

}
