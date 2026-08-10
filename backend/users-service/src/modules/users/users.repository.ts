import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>,
	) {}

	public async findById(id: string): Promise<UserEntity | null> {
		return this.repository.findOneBy({ id });
	}

	public async create(data: Partial<UserEntity>): Promise<UserEntity> {
		const user = this.repository.create(data);

		return this.repository.save(user);
	}

	public async update(
		id: string,
		data: Partial<UserEntity>,
	): Promise<UserEntity | null> {
		await this.repository.update({ id }, data);

		return this.findById(id);
	}
}
