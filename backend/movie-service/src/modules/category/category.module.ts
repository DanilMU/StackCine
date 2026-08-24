import { Module } from '@nestjs/common';

import { CategoryCacheService } from './category.cache.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, CategoryRepository, CategoryCacheService],
	exports: [CategoryService],
})
export class CategoryModule {}
