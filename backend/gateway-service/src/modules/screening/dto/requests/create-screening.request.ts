import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScreeningRequest {
	@ApiProperty({
		example: 'movie_123',
		description: 'ID фильма',
	})
	@IsString()
	@IsNotEmpty()
	public movieId!: string;

	@ApiProperty({
		example: 'hall_123',
		description: 'ID зала',
	})
	@IsString()
	@IsNotEmpty()
	public hallId!: string;

	@ApiProperty({
		example: '2025-12-21 16:30:00.000',
		description: 'Время начала',
	})
	@IsString()
	@IsNotEmpty()
	public startAt!: string;

	@ApiProperty({
		example: '2025-12-21 19:30:00.000',
		description: 'Время окончания',
	})
	@IsString()
	@IsNotEmpty()
	public endAt!: string;
}
