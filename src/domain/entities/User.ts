import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany, 
  BeforeInsert, 
  BeforeUpdate 
} from "typeorm";
import { hashSync } from "bcryptjs";

import { Order } from "./Order";
import { Cart } from "./Cart";
import { Review } from "./Review";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "timestamp" })
    registrationDate: Date;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPass() {
        this.password = hashSync(this.password, 9);
    }
}
