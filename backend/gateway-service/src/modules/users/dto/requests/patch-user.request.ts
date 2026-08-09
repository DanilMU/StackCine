import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PatchUserRequest {
	@ApiPropertyOptional({
		example: 'John Doe',
	})
	@IsString()
	@IsOptional()
	public name?: string;
}
