import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsString,
	ValidateNested,
} from 'class-validator';

export enum SeatType {
	CHAIR = 'chair',
	SOFA2 = 'sofa2',
	SOFA3 = 'sofa3',
}

class RowConfig {
	@ApiProperty({
		example: 1,
	})
	@IsInt()
	public row!: number;

	@ApiProperty({
		example: 20,
	})
	@IsInt()
	public columns!: number;

	@ApiProperty({
		example: SeatType.CHAIR,
		enum: SeatType,
	})
	@IsEnum(SeatType)
	public type!: SeatType;

	@ApiProperty({
		example: 350,
	})
	@IsInt()
	public price!: number;
}

export class CreateHallRequest {
	@ApiProperty({
		example: 'Зал 1',
		description: 'Название зала',
	})
	@IsString()
	@IsNotEmpty()
	public name!: string;

	@ApiProperty({
		example: '124nlnkhkjb12k1k',
	})
	@IsString()
	@IsNotEmpty()
	public theaterId!: string;

	@ApiProperty({
		type: () => [RowConfig],
		description: 'Раскладка рядов и мест в зале',
		example: [
			{
				row: 1,
				columns: 10,
				type: SeatType.CHAIR,
				price: 350,
			},
		],
	})
	@IsArray()
	@ValidateNested()
	@Type(() => RowConfig)
	public layout!: RowConfig[];
}
