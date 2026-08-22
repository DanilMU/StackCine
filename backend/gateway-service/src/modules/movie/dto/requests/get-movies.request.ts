import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsInt,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';

export class GetMoviesRequest {
	@ApiPropertyOptional({
		example: 'classic',
		description: 'Movie category',
	})
	@IsOptional()
	@IsString()
	@Transform(({ value }) => (value ? String(value).trim() : undefined))
	public category?: string;

	@ApiPropertyOptional({
		example: 'true',
	})
	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => {
		if (value === 'true' || value === true) return true;
		if (value === 'false' || value === false) return false;

		return undefined;
	})
	public random?: boolean;

	@ApiPropertyOptional({
		example: 13,
	})
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(100)
	@Transform(({ value }) =>
		value !== undefined && value !== '' ? Number(value) : undefined,
	)
	public limit?: number;
}
