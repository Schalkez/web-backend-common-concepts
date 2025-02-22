import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePasswordColumnLength1731514631474
  implements MigrationInterface
{
  name = 'UpdatePasswordColumnLength1731514631474';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" TYPE character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" TYPE character varying(50)`,
    );
  }
}
