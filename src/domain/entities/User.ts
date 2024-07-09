import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany, 
  BeforeInsert, 
  BeforeUpdate, 
  ManyToMany,
  JoinTable
} from "typeorm";
import { hashSync } from "bcryptjs";

import { Cart } from "./Cart";
import { Review } from "./Review";
import { Payment } from "./Payment";
import { Product } from "./Product";

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

    @Column({ type: "boolean", default: false })
    isAdmin: boolean;

    @Column({ type: "timestamp" })
    registrationDate: Date;

    @ManyToMany(() => Product)
    @JoinTable()
    myGames: Product[];

    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[];

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
