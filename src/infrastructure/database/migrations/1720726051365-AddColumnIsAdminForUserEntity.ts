import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnIsAdminForUserEntity1720726051365 implements MigrationInterface {
    name = 'AddColumnIsAdminForUserEntity1720726051365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items_product" DROP CONSTRAINT "FK_d02e0a35b494de24c8bed10fabf"`);
        await queryRunner.query(`ALTER TABLE "cart_items_product" ADD CONSTRAINT "FK_d02e0a35b494de24c8bed10fabf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items_product" DROP CONSTRAINT "FK_d02e0a35b494de24c8bed10fabf"`);
        await queryRunner.query(`ALTER TABLE "cart_items_product" ADD CONSTRAINT "FK_d02e0a35b494de24c8bed10fabf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
