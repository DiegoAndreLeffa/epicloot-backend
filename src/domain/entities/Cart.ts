import { 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  ManyToMany, 
  JoinTable, 
  Column 
} from "typeorm";

import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToMany(() => Product, (product) => product.carts)
  @JoinTable()
  items: Product[];

  @Column({ type: "timestamp" })
  createdAt: Date;
}
