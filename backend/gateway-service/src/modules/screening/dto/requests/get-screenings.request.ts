import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class GetScreeningsRequest {
	@ApiPropertyOptional({
		example: '5j6jjj239ufsdf0s9sdf045',
		description: 'Theater ID to filter screenings',
	})
	@IsOptional()
	@IsString()
	public theaterId?: string;

	@ApiPropertyOptional({
		example: '2026-09-05',
		description: 'Target date (ISO or YYYY-MM-DD)',
	})
	@IsOptional()
	@IsISO8601()
	public date?: string;
}
