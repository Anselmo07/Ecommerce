import { Products } from "src/Products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from 'uuid';

@Entity({name: 'categories'})
export class categories{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @OneToMany(() => Products, (product) => product.category_id)
    products: Products[];
}