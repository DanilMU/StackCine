export class SeedContext {
	private readonly registry = new Map<
		string,
		Map<string, string | number>
	>();

	public setMapping(
		entityName: string,
		naturalKey: string,
		dbId: string | number,
	): void {
		let entityMap = this.registry.get(entityName);
		if (!entityMap) {
			entityMap = new Map();
			this.registry.set(entityName, entityMap);
		}
		entityMap.set(naturalKey, dbId);
	}

	public getId<T = string | number>(
		entityName: string,
		naturalKey: string,
	): T | undefined {
		return this.registry.get(entityName)?.get(naturalKey) as
			T | undefined;
	}

	public hasEntity(entityName: string): boolean {
		return this.registry.has(entityName);
	}
}
