import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({
        example: 'Monitor 240hz'
    })
    name: string;

    @Column({type: 'text', nullable: false})
    @ApiProperty({
        example: 'Es monitor cuenta con una resolucion de 1920x1080 y una velociad de 240hz'
    })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    @ApiProperty({
        example: '$150'
    })
    price: number;

    @Column({ nullable: false })
    @ApiProperty({
        example: '5'
    })
    stock: number;

    @Column({ type: 'varchar', default: 'default-image-url', nullable: true })
    @ApiProperty({
        example: '/url:imagen'
    })
    imgUrl: string;

    @ManyToOne(() => Categories, (category) => category.products)
    @ApiProperty()
    category_id: Categories;

    @ManyToMany(()=> OrderDetails, (orderDetails) => orderDetails.products)
    @JoinTable()
    @ApiProperty()
    orderDetails: OrderDetails[];
}