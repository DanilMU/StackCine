import { Injectable } from '@nestjs/common';
import type { GetAllCategoriesResponse } from '@stackcine/contracts/gen/ts/category';

import { CategoryCacheService } from './category.cache.service';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
	public constructor(
		private readonly categoryRepository: CategoryRepository,
		private readonly categoryCacheService: CategoryCacheService,
	) {}

	public async getAll(): Promise<GetAllCategoriesResponse> {
		const cached =
			await this.categoryCacheService.getAll<
				GetAllCategoriesResponse['categories']
			>();

		if (cached) {
			return { categories: cached };
		}

		const categories = await this.categoryRepository.findAll();

		await this.categoryCacheService.setAll(categories);

		return { categories };
	}
}
