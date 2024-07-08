import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne 
} from "typeorm";

import { Order } from "./Order";

@Entity("payment")
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Order, (order) => order.payment)
    order: Order;

    @Column({ type: "varchar" })
    type: string;

    @Column({ type: "timestamp" })
    date: Date;

    @Column({ type: "decimal" })
    amount: number;
}
