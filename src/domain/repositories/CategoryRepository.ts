import { Category } from "../entities";

export interface CategoryRepository {
  findByName(name: string): Promise<Category | null>;
  save(category: Category): Promise<void>;
}
