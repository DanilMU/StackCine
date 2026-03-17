import { IsString, Matches } from 'class-validator';

export class RmqValidator {
	@Matches(/amqp:\/\/[^:]+:[^@]+@[^:]+:\d+$/)
	public RMQ_URL: string;

	@IsString()
	public RMQ_NOTIFICATIONS: string;
}
