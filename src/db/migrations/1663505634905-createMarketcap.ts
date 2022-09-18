import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMarketcap1663505634905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public."marketcap"
        (
            "id" SERIAL NOT NULL,
            "address" character varying NOT NULL,
            "marketcap" character varying NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            CONSTRAINT "PK_contract_id" PRIMARY KEY ("id")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE IF EXISTS public."marketcap";
    `);
  }
}
