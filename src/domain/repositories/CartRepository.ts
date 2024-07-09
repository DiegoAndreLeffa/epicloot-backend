import { Cart } from "../entities/Cart";

export interface CartRepository {
  findById(id: string): Promise<Cart | null>;
  findByUserId(userId: string): Promise<Cart | null>;
  findAll(): Promise<Cart[]>;
  save(cart: Cart): Promise<void>;
  delete(id: string): Promise<void>;
}
