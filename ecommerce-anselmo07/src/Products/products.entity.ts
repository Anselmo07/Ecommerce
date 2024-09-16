import { categories } from "src/entity/categories.entity";
import { OrderDetails } from "src/entity/orderDetails.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from 'uuid';

@Entity({name: 'products'})
export class Products{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    
    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'int', nullable: false })
    stock: number;

    @Column({ type: 'varchar', default: 'default-image-url', nullable: true })
    imgUrl: string;

    @ManyToOne(() => categories, (category) => category.products)
    category_id: categories;

    @ManyToMany(()=> OrderDetails, (orderDetails) => orderDetails.products)
    @JoinTable()
    orderDetails: OrderDetails[];

    
}