import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

class SeatDto {
	@ApiProperty({
		example: 'A9fdO-2Jw7b-Ia0Rn9nyk',
		description: 'ID выбранного места в зале',
	})
	@IsString()
	@IsNotEmpty()
	public seatId!: string;

	@ApiProperty({
		example: 350,
		description: 'Стоимость билета за место (в рублях)',
	})
	@IsInt()
	public price!: number;
}

export class InitPaymentRequest {
	@ApiProperty({
		example: 'UOg0F8RjUZVHOYBmrAfEG',
		description: 'ID сеанса из базы данных',
	})
	@IsString()
	@IsNotEmpty()
	public screeningId!: string;

	@ApiProperty({
		type: [SeatDto],
		description: 'Список выбранных мест для покупки',
		example: [
			{
				seatId: 'A9fdO-2Jw7b-Ia0Rn9nyk',
				price: 350,
			},
			{
				seatId: 'hpqG_OyfZuUoHaVGAiwly',
				price: 350,
			},
		],
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SeatDto)
	public seats!: SeatDto[];

	@ApiPropertyOptional({
		example: false,
		description:
			'Сохранить ли способ оплаты (банковскую карту) для оплаты в 1 клик',
	})
	@IsBoolean()
	@IsOptional()
	public savePaymentMethod!: boolean;

	@ApiPropertyOptional({
		example: 'pm_2c0a1b2c3d4e5f6a7b8c9d0e',
		description:
			'ID ранее сохранённого способа оплаты (если платим привязанной картой)',
	})
	@IsString()
	@IsOptional()
	public paymentMethodId!: string;
}
