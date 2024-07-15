import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToMany 
} from "typeorm";

import { Product } from "./Product";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
