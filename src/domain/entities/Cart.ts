import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  items: Product[];

  @Column({ type: "timestamp" })
  createdAt: Date;
}
