import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from 'uuid';
import { Orders } from "./orders.entity";
import { Products } from "../Products/products.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'orderDetails'})
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string = uuid();

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: {
        to: (value: number) => value, 
        from: (value: string) => parseFloat(value),}
    ,})
    price: number;

    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({name: 'order_id'})
    @ApiProperty()
    order: Orders;

    @ManyToMany(() => Products, (products) => products.orderDetails)
    @JoinTable()
    @ApiProperty()
    products: Products[];
}