import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	CreateRefundRequest,
	CreateRefundResponse,
	ProcessRefundEventRequest,
} from '@stackcine/contracts/gen/ts/refund';

import { RefundService } from './refund.service';

@Controller()
export class RefundController {
	public constructor(private readonly refundService: RefundService) {}

	@GrpcMethod('RefundService', 'CreateRefund')
	public async createRefund(
		data: CreateRefundRequest,
	): Promise<CreateRefundResponse> {
		return this.refundService.createRefund(data);
	}

	@GrpcMethod('RefundService', 'ProcessRefundEvent')
	public async processEvent(data: ProcessRefundEventRequest) {
		return this.refundService.processEvent(data);
	}
}
