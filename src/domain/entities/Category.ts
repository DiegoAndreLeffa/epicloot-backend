import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany 
} from "typeorm";

import { Product } from "./Product";

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
