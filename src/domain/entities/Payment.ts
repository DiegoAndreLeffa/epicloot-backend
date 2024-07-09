import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  ManyToMany, 
  JoinTable 
} from "typeorm";

import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  items: Product[];

  @Column({ type: "varchar" })
  type: string;

  @Column({ type: "timestamp" })
  date: Date;

  @Column({ type: "decimal" })
  amount: number;
}
