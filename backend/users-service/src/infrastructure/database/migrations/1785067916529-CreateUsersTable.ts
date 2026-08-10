import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1785067916529 implements MigrationInterface {
	name = 'CreateUsersTable1785067916529';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying, "avatar" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "users"`);
	}
}
