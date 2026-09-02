import { Injectable } from '@nestjs/common';
import {
	PaymentCreateInput,
	PaymentUpdateInput,
} from 'prisma/generated/models';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PaymentRepository {
	public constructor(private readonly prismaService: PrismaService) {}

	public findPaymentById(id: string) {
		return this.prismaService.payment.findUnique({
			where: {
				id,
			},
		});
	}

	public createPayment(data: PaymentCreateInput) {
		return this.prismaService.payment.create({ data });
	}

	public updatePayment(id: string, data: PaymentUpdateInput) {
		return this.prismaService.payment.update({
			where: {
				id,
			},
			data,
		});
	}
}
