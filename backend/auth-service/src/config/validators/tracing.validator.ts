import { IsString } from 'class-validator';

export class TracingValidator {
	@IsString()
	public TRACING_URL!: string;
}
