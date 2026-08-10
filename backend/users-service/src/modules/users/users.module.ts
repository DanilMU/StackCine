import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROTO_PATHS } from '@stackcine/contracts';
import { AccountClientGrpc } from 'src/infrastructure/grpc/clients/account.client';

import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		ClientsModule.registerAsync([
			{
				name: 'ACCOUNT_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'account.v1',
						protoPath: PROTO_PATHS.ACCOUNT,
						url: configService.getOrThrow<string>(
							'AUTH_GRPC_URL',
						),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, AccountClientGrpc],
	exports: [UsersService, UsersRepository],
})
export class UsersModule {}
