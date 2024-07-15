import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnIsAdminForUserEntity1720726216722 implements MigrationInterface {
    name = 'AddColumnIsAdminForUserEntity1720726216722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "categoriesId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b31522e7a7f93ef47f311590a79" FOREIGN KEY ("categoriesId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b31522e7a7f93ef47f311590a79"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoriesId"`);
    }

}
