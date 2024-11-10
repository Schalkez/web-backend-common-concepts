import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNotNullFromSchemaAndTitle1730761844257
  implements MigrationInterface
{
  name = 'RemoveNotNullFromSchemaAndTitle1730761844257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "schema" DROP NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "title" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "schema" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "title" SET NOT NULL`,
    );
  }
}
