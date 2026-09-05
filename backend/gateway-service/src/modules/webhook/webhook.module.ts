import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { PaymentClientGrpc } from '../payment/payment.grpc';
import { RefundClientGrpc } from '../refund/refund.grpc';

import { WebhookController } from './webhook.controller';

@Module({
	imports: [GrpcModule.register(['PAYMENT_PACKAGE', 'REFUND_PACKAGE'])],
	controllers: [WebhookController],
	providers: [PaymentClientGrpc, RefundClientGrpc],
})
export class WebhookModule {}
