import { Category } from '../entities/Category';

export interface CategoryRepository {
  findByName(name: string): Promise<Category | null>;
  create(data: Partial<Category>): Category;
  save(category: Category): Promise<void>;
}
