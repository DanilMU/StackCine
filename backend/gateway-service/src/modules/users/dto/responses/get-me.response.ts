import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetMeResponse {
	@ApiProperty({
		example: 'X6KBMTnCDkbrPN_I0YXG8',
		description: 'Уникальный идентификатор пользователя',
	})
	public id!: string;

	@ApiPropertyOptional({
		example: 'John Doe',
		description: 'Имя пользователя',
	})
	public name!: string;

	@ApiPropertyOptional({
		example: 'john.doe@example.com',
		description: 'Электронная почта',
	})
	public email!: string;

	@ApiPropertyOptional({
		example: '+77777777777',
		description: 'Номер телефона',
	})
	public phone!: string;

	@ApiPropertyOptional({
		example: 'https://example.com/avatar.jpg',
		description: 'Ссылка на аватар пользователя',
	})
	public avatar!: string;
}
