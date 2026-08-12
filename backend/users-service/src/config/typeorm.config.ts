import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export const getTypeOrmConfig = (
	configservice: ConfigService,
): TypeOrmModuleOptions => {
	return {
		type: 'postgres',
		host: configservice.getOrThrow<string>('DATABASE_HOST'),
		port: Number(configservice.getOrThrow<number>('DATABASE_PORT')),
		username: configservice.getOrThrow<string>('DATABASE_USER'),
		password: configservice.getOrThrow<string>('DATABASE_PASSWORD'),
		database: configservice.getOrThrow<string>('DATABASE_NAME'),
		entities: [UserEntity],
		synchronize: configservice.get<string>('DATABASE_SYNC') === 'false',
		logging: configservice.get<string>('DATABASE_LOGGING') === 'true',
		autoLoadEntities: true,
	};
};
