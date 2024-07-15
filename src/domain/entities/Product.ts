import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    OneToMany, 
    ManyToMany,
    JoinTable
} from "typeorm";

import { Category } from "./Category";
import { Review } from "./Review";
import { Cart } from "./Cart";

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

    @Column({ type: "varchar" })
    coverImage: string;

    @Column('simple-array')
    galleryImages: string[];

    @Column({ nullable: true })
    link: string;

    @ManyToMany(() => Category, (category) => category.products, { cascade: true })
    @JoinTable()
    categories: Category[];

    @OneToMany(() => Cart, (cart) => cart.items)
    carts: Cart[];

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];
}