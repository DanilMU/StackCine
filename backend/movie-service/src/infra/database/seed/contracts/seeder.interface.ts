import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from '../../drizzle/schema';

import { SeedContext } from './seed-context';

export type DrizzleDatabase = NodePgDatabase<typeof schema>;
export type DrizzleTransaction = Parameters<
	Parameters<DrizzleDatabase['transaction']>[0]
>[0];

export interface ISeeder {
	readonly name: string;
	readonly order: number;
	run(
		db: DrizzleTransaction | DrizzleDatabase,
		context: SeedContext,
	): Promise<void>;
	wipe?(db: DrizzleTransaction | DrizzleDatabase): Promise<void>;
}
