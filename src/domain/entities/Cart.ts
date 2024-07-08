import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    OneToMany 
} from "typeorm";

import { User } from "./User";
import { CartItem } from "./CartItem";

@Entity("cart")
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne(() => User, (user) => user.carts)
    user: User;

    @Column({ type: "timestamp" })
    creationDate: Date;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    items: CartItem[];
}
