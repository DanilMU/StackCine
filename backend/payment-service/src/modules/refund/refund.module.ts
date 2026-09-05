import { Module } from '@nestjs/common';

import { RefundController } from './refund.controller';
import { RefundRepository } from './refund.repository';
import { RefundService } from './refund.service';

@Module({
	controllers: [RefundController],
	providers: [RefundService, RefundRepository],
})
export class RefundModule {}
