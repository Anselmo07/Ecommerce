import { Users } from "../Users/users.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from 'uuid';
import { OrderDetails } from "./orderDetails.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'orders'})
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string = uuid();

    @ManyToOne(()=> Users,(users)=> users.orders_id,{
        onDelete:'CASCADE',
    })
    @JoinColumn({name: 'user_id'})
    @ApiProperty()
    user_id:Users;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    date: Date;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    @ApiProperty()
    orderDetails: OrderDetails;
}