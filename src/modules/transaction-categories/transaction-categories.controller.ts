import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from '~shared/decorators/active-user-id';
import { TransactionCategoriesService } from './transaction-categories.service';

@Controller('categories')
export class TransactionCategoriesController {
  constructor(private readonly categoriesService: TransactionCategoriesService) {}

  @Get()
  findAllByUserId(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllByUserId(userId);
  }
}
