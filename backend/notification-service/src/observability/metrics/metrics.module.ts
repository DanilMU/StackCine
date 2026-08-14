import { Global, Module } from '@nestjs/common';
import {
	getToken,
	makeCounterProvider,
	makeHistogramProvider,
	PrometheusModule,
} from '@willsoto/nestjs-prometheus';

import { RmqMetricsInterceptor } from './rmq-metrics.interceptor';

@Global()
@Module({
	imports: [
		PrometheusModule.register({
			path: '/metrics',
			defaultMetrics: {
				enabled: true,
			},
		}),
	],
	providers: [
		RmqMetricsInterceptor,
		makeHistogramProvider({
			name: 'rmq_event_proccessing_duration_seconds',
			help: 'Ramq event proccessing duration',
			labelNames: ['service', 'event'],
			buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5],
		}),
		makeCounterProvider({
			name: 'rmq_event_total',
			help: ' Total RMQ events proccessed',
			labelNames: ['service', 'event', 'status'],
		}),
		makeCounterProvider({
			name: 'rmq_events_ack_total',
			help: ' Total ACKed RMQ events',
			labelNames: ['service', 'event'],
		}),
		makeCounterProvider({
			name: 'rmq_events_nack_total',
			help: ' Total NACKed RMQ events',
			labelNames: ['service', 'event'],
		}),
	],
	exports: [
		RmqMetricsInterceptor,
		getToken('rmq_event_proccessing_duration_seconds'),
		getToken('rmq_event_total'),
		getToken('rmq_events_ack_total'),
		getToken('rmq_events_nack_total'),
	],
})
export class MetricsModule {}
