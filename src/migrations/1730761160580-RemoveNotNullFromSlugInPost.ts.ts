import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNotNullFromSlugInPostts1730761160580
  implements MigrationInterface
{
  name = 'RemoveNotNullFromSlugInPost1730761160580';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Bỏ ràng buộc NOT NULL cho cột slug
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "slug" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Khôi phục lại ràng buộc NOT NULL cho cột slug
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "slug" SET NOT NULL`,
    );
  }
}
