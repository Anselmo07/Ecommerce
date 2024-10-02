import { Categories } from "../entity/categories.entity";
import { OrderDetails } from "../entity/orderDetails.entity";
import { File } from "../Files/files.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from 'uuid';

@Entity({name: 'products'})
export class Products{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ nullable: false })
    stock: number;

    @Column({ type: 'varchar', default: 'default-image-url', nullable: true })
    imgUrl: string;

    @ManyToOne(() => Categories, (category) => category.products)
    category_id: Categories;

    @ManyToMany(()=> OrderDetails, (orderDetails) => orderDetails.products)
    @JoinTable()
    orderDetails: OrderDetails[];

    @OneToMany(()=> File, (files)=> files.products)
    files:File[];
}