import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    OneToMany 
} from "typeorm";

import { Category } from "./Category";
import { CartItem } from "./CartItem";
import { Review } from "./Review";

@Entity("product")
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "decimal" })
    price: number;

    @ManyToOne(() => Category, (category) => category.products, { cascade: true })
    category: Category;

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems: CartItem[];

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];
}