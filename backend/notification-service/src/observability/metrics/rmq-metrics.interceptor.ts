import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type RmqContext } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import { type Observable, tap } from 'rxjs';
import { RmqService } from 'src/infrastructure/rmq/rmq.service';

@Injectable()
export class RmqMetricsInterceptor implements NestInterceptor {
	private readonly SERVICE_NAME: string;

	public constructor(
		private readonly rmqService: RmqService,
		private readonly configService: ConfigService,

		@InjectMetric('rmq_event_proccessing_duration_seconds')
		private readonly proccessingDuration: Histogram<string>,

		@InjectMetric('rmq_event_total')
		private readonly eventsTotal: Counter<string>,
	) {
		this.SERVICE_NAME =
			this.configService.get<string>('APP_NAME') ||
			'notification-service';
	}

	public intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		const rpcCtx = context.switchToRpc();
		const rmqContext = rpcCtx.getContext<RmqContext>();
		const event = rmqContext.getPattern();

		const endTimer = this.proccessingDuration.startTimer({
			service: this.SERVICE_NAME,
			event,
		});

		return next.handle().pipe(
			tap({
				next: () => {
					this.eventsTotal.inc({
						service: this.SERVICE_NAME,
						event,
						status: 'success',
					});
					this.rmqService.ack(rmqContext, event);
					endTimer();
				},
				error: (error) => {
					this.eventsTotal.inc({
						service: this.SERVICE_NAME,
						event,
						status: 'error',
					});
					console.error(
						`[${this.SERVICE_NAME}] Event ${event} processing error: `,
						error.message ?? error,
					);
					this.rmqService.nack(rmqContext, event, false);
					endTimer();
				},
			}),
		);
	}
}
