import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1720703720032 implements MigrationInterface {
    name = 'InitialMigrations1720703720032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, "coverImage" character varying NOT NULL, "galleryImages" text NOT NULL, "link" character varying, "categoryId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "amount" numeric NOT NULL, "userId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "registrationDate" TIMESTAMP NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "comment" text NOT NULL, "date" TIMESTAMP NOT NULL, "productId" uuid, "userId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_items_product" ("cartId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_fba978712582a686a64ed8327ae" PRIMARY KEY ("cartId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2dd7378f615cf55a172f01aead" ON "cart_items_product" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d02e0a35b494de24c8bed10fab" ON "cart_items_product" ("productId") `);
        await queryRunner.query(`CREATE TABLE "payment_items_product" ("paymentId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_0327726e8e60e957f162e4ccdb4" PRIMARY KEY ("paymentId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5ab47deb7ae7edc7e34c567e6" ON "payment_items_product" ("paymentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5207e565139069a29a110d5f4e" ON "payment_items_product" ("productId") `);
        await queryRunner.query(`CREATE TABLE "user_my_games_product" ("userId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_4eaa63b27c353d6485936ec91cd" PRIMARY KEY ("userId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_887c9261a8c85801c649d95f88" ON "user_my_games_product" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_da6a800bc41b388f272f1b4dab" ON "user_my_games_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_a6b3c434392f5d10ec171043666" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items_product" ADD CONSTRAINT "FK_2dd7378f615cf55a172f01aeade" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_items_product" ADD CONSTRAINT "FK_d02e0a35b494de24c8bed10fabf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "payment_items_product" ADD CONSTRAINT "FK_b5ab47deb7ae7edc7e34c567e69" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "payment_items_product" ADD CONSTRAINT "FK_5207e565139069a29a110d5f4e3" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_my_games_product" ADD CONSTRAINT "FK_887c9261a8c85801c649d95f88a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_my_games_product" ADD CONSTRAINT "FK_da6a800bc41b388f272f1b4daba" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_my_games_product" DROP CONSTRAINT "FK_da6a800bc41b388f272f1b4daba"`);
        await queryRunner.query(`ALTER TABLE "user_my_games_product" DROP CONSTRAINT "FK_887c9261a8c85801c649d95f88a"`);
        await queryRunner.query(`ALTER TABLE "payment_items_product" DROP CONSTRAINT "FK_5207e565139069a29a110d5f4e3"`);
        await queryRunner.query(`ALTER TABLE "payment_items_product" DROP CONSTRAINT "FK_b5ab47deb7ae7edc7e34c567e69"`);
        await queryRunner.query(`ALTER TABLE "cart_items_product" DROP CONSTRAINT "FK_d02e0a35b494de24c8bed10fabf"`);
        await queryRunner.query(`ALTER TABLE "cart_items_product" DROP CONSTRAINT "FK_2dd7378f615cf55a172f01aeade"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_a6b3c434392f5d10ec171043666"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da6a800bc41b388f272f1b4dab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_887c9261a8c85801c649d95f88"`);
        await queryRunner.query(`DROP TABLE "user_my_games_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5207e565139069a29a110d5f4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5ab47deb7ae7edc7e34c567e6"`);
        await queryRunner.query(`DROP TABLE "payment_items_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d02e0a35b494de24c8bed10fab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2dd7378f615cf55a172f01aead"`);
        await queryRunner.query(`DROP TABLE "cart_items_product"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
