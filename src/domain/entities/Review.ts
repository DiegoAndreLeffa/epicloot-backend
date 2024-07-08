import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne 
} from "typeorm";

import { User } from "./User";
import { Product } from "./Product";

@Entity("reviews")
export class Review {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @Column({ type: "int" })
    rating: number;

    @Column({ type: "text" })
    comment: string;

    @Column({ type: "timestamp" })
    date: Date;
}
