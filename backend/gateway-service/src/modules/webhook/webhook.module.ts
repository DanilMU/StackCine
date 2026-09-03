import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { PaymentClientGrpc } from '../payment/payment.grpc';

import { WebhookController } from './webhook.controller';

@Module({
	imports: [GrpcModule.register(['PAYMENT_PACKAGE'])],
	controllers: [WebhookController],
	providers: [PaymentClientGrpc],
})
export class WebhookModule {}
