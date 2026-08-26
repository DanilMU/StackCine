import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTheaterRequest {
	@ApiProperty({
		example: 'Люмен',
		description: 'Название театра',
	})
	@IsString()
	@IsNotEmpty()
	public name!: string;

	@ApiProperty({
		example: 'ул. Ленина, дю 25',
		description: 'Адрес кинотеатра',
	})
	@IsString()
	@IsNotEmpty()
	public address!: string;
}
