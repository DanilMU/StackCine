import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/generated/browser';

import { PrismaService } from '@/infrastructure/prisma/prisma.service';

@Injectable()
export class AccountRepository {
	public constructor(private readonly prismaService: PrismaService) {}

	public findById(id: string): Promise<Account | null> {
		return this.prismaService.account.findUnique({
			where: {
				id,
			},
		});
	}
}
