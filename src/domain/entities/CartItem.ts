import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne 
} from "typeorm";

import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity("cartItem")
export class CartItem {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;

    @ManyToOne(() => Product, (product) => product.cartItems)
    product: Product;

    @Column({ type: "int" })
    quantity: number;
}
