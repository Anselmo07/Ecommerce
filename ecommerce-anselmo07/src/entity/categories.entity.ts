import { ApiProperty } from "@nestjs/swagger";
import { Products } from "../Products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from 'uuid';

@Entity({name: 'categories'})
export class Categories{
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    @ApiProperty()
    name: string;

    @OneToMany(() => Products, (product) => product.category_id)
    @ApiProperty()
    products: Products[];
}