import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    OneToOne 
} from "typeorm";

import { User } from "./User";
import { Payment } from "./Payment";

@Entity("order")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Column({ type: "timestamp" })
    date: Date;

    @Column({ type: "varchar" })
    status: string;

    @OneToOne(() => Payment, (payment) => payment.order)
    payment: Payment;
}
