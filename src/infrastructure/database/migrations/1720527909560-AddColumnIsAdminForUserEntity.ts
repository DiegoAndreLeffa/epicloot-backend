import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnIsAdminForUserEntity1720527909560 implements MigrationInterface {
    name = 'AddColumnIsAdminForUserEntity1720527909560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "creationDate" TO "createdAt"`);
        await queryRunner.query(`CREATE TABLE "cart_items_product" ("cartId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_fba978712582a686a64ed8327ae" PRIMARY KEY ("cartId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2dd7378f615cf55a172f01aead" ON "cart_items_product" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d02e0a35b494de24c8bed10fab" ON "cart_items_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "cart_items_product" ADD CONSTRAINT "FK_2dd7378f615cf55a172f01aeade" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_items_product" ADD CONSTRAINT "FK_d02e0a35b494de24c8bed10fabf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items_product" DROP CONSTRAINT "FK_d02e0a35b494de24c8bed10fabf"`);
        await queryRunner.query(`ALTER TABLE "cart_items_product" DROP CONSTRAINT "FK_2dd7378f615cf55a172f01aeade"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d02e0a35b494de24c8bed10fab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2dd7378f615cf55a172f01aead"`);
        await queryRunner.query(`DROP TABLE "cart_items_product"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "createdAt" TO "creationDate"`);
    }

}
