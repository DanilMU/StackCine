import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROTO_PATHS } from '@stackcine/contracts';

import { BookingClientGrpc } from '@/clients/booking.client';

import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'BOOKING_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'booking.v1',
						protoPath: PROTO_PATHS.BOOKING,
						url: configService.getOrThrow<string>(
							'BOOKING_GRPC_URL',
						),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [PaymentController],
	providers: [PaymentService, PaymentRepository, BookingClientGrpc],
	exports: [BookingClientGrpc],
})
export class PaymentModule {}
