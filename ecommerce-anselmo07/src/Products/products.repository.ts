import { Injectable, NotFoundException} from "@nestjs/common";
import { Prodcuts } from "./products.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./products.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsRepository {
    constructor(@InjectRepository(Products) private readonly productsRepository: Repository<Products>
){}

    async getProducts(): Promise<Products[]> {
        return this.productsRepository.find();
    }

    async getProductsById(id: string): Promise<Products>{
        return this.productsRepository.findOne({where: {id}});
    }

    async createProducts(products: Products): Promise<Products>{
        const newProducts= this.productsRepository.create(products);
        return this.productsRepository.save(newProducts);
    }

    async updateProducts(id: string, products:Partial<Products>):Promise<Products>{
        const buscarId = await this.productsRepository.findOne({where: {id}});
        
        if (!buscarId) {
            throw new NotFoundException(`Usuario con ID ${products} no encontrado`);
        }
        const updateProducts = this.productsRepository.merge(buscarId, products);
        return this.productsRepository.save(updateProducts);
    }

    async deleteProductsById(id: string):Promise<void>{
        const borrarProduct = await this.productsRepository.delete(id);

        if (borrarProduct.affected === 0){
            throw new NotFoundException(`El producto con ${id} no se encontro`);
        }
    }
}