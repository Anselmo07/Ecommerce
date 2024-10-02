import { Products } from "../Products/products.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'files'})
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    mimeType: string;

    @Column({ type: 'bytea'})
    data: Buffer;

    @ManyToOne(()=> Products, (products) => products.files)
    @JoinColumn({name: "products_id"})
    products: Products;
}