import { Users } from "../Users/users.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from 'uuid';
import { OrderDetails } from "./orderDetails.entity";

@Entity({name: 'orders'})
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ManyToOne(()=> Users,(users)=> users.orders_id)
    @JoinColumn({name: 'user_id'})
    user_id:Users;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;
}