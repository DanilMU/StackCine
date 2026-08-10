import { nanoid } from 'nanoid';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryColumn()
	public id: string = nanoid();

	@Column({ type: 'varchar', nullable: true })
	public name?: string | null;

	@Column({ type: 'varchar', nullable: true })
	public avatar?: string | null;

	@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
	public createdAt: Date = new Date();

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
	public updatedAt: Date = new Date();
}
