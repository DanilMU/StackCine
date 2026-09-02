import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	CreatePaymentRequest,
	CreatePaymentResponse,
} from '@stackcine/contracts/gen/ts/payment';

import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
	public constructor(private readonly paymentService: PaymentService) {}

	@GrpcMethod('PaymentService', 'CreatePayment')
	public async createPayment(
		data: CreatePaymentRequest,
	): Promise<CreatePaymentResponse> {
		return this.paymentService.createPayment(data);
	}
}
