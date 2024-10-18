import { ApiProperty } from "@nestjs/swagger";
import { Products } from "../Products/products.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'files'})
export class File {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty()
    name:string;

    @Column()
    @ApiProperty()
    mimeType: string;

    @Column({ type: 'bytea'})
    @ApiProperty()
    data: Buffer;
}