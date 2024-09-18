import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../products.entity";
import { File } from "./files.entity";
import { Repository } from "typeorm";

@Injectable()
export class FilesService {
    constructor(@InjectRepository(File) private readonly filesRepository: Repository<File>){

    }

    async createFile({name, mimeType, data, products}:{
        name: string;
        mimeType: string;
        data: Buffer;
        products: Products;
    }) {
        const file = new File();
        file.name = name;
        file.mimeType = mimeType;
        file.data = data;
        file.products = products;

        return this.filesRepository.save(file);
    }
}