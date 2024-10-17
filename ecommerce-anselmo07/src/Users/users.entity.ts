import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../Auth/roles.enum";
import { Orders } from "../entity/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    @ApiProperty()
    email: string;
    
    @Column({ type: 'varchar', length: 50, nullable: false })
    @ApiProperty()
    name: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    @ApiProperty()
    password: string;

    @Column({type: 'varchar', length: 50, nullable: false })
    @ApiProperty()
    address: string;

    @Column({ type: 'varchar', nullable: true })
    @ApiProperty()
    phone: string;

    @Column({type: 'varchar', length: 50, nullable: true })
    @ApiProperty()
    country: string;

    @Column({type: 'varchar', length: 50, nullable: true })
    @ApiProperty()
    city: string;

    @OneToMany(() => Orders, (order)=> order.user_id)
    @ApiProperty()
    orders_id?: Orders[];

    @Column({ type: 'enum', enum: Role, default: Role.User })
    @ApiProperty()
    isAdmin: Role;
}