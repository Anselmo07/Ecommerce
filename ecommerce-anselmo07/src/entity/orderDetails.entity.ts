import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from 'uuid';
import { Orders } from "./orders.entity";
import { Products } from "src/Products/products.entity";

@Entity({name: 'orderDetails'})
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({name: 'order_id'})
    order: Orders;

    @ManyToMany(() => Products, (products) => products.orderDetails)
    @JoinTable()
    products: Products[];
}