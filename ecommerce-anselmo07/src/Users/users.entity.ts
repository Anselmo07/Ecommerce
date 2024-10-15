import { Role } from "../Auth/roles.enum";
import { Orders } from "../entity/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import {v4 as uuid } from 'uuid';

@Entity({name: 'users'})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    email: string;
    
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    password: string;

    @Column({type: 'varchar', length: 50, nullable: false }) // false
    address: string;

    @Column({ type: 'varchar', nullable: true })
    phone: string;

    @Column({type: 'varchar', length: 50, nullable: true })
    country: string;

    @Column({type: 'varchar', length: 50, nullable: true })
    city: string;

    @OneToMany(() => Orders, (order)=> order.user_id)
    orders_id?: Orders[];

    @Column({ type: 'enum', enum: Role, default: Role.User })
    isAdmin: Role;

    // @Column()
    // createdAT: string;
}