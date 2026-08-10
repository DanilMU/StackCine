import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { UserEntity } from '../modules/users/entities/user.entity';

config();

export default new DataSource({
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [UserEntity],
	migrations: ['src/infrastructure/database/migrations/*.ts'],
	synchronize: false,
	logging: true,
});
