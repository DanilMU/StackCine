import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Protected } from 'src/shared/decorators';

import { InitPaymentRequest } from './dto';
import { PaymentClientGrpc } from './payment.grpc';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
	public constructor(private readonly payment: PaymentClientGrpc) {}

	@ApiOperation({
		summary: 'Инициализация платежа за билеты',
		description:
			'Создаёт платёж в ЮKassa и возвращает ссылку для перехода на страницу оплаты',
	})
	@ApiBearerAuth()
	@Protected()
	@Post('init')
	@HttpCode(HttpStatus.OK)
	public async initPayment(
		@Body() dto: InitPaymentRequest,
		@CurrentUser() userId: string,
	) {
		return this.payment.call('createPayment', {
			...dto,
			userId,
		});
	}
}
