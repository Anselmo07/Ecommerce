import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entity/categories.entity";
import { Products } from "src/Products/products.entity";
import { Repository } from "typeorm";
import { productMock } from "./products";
import { categories } from "../categories/categories-mock";

@Injectable()
export class ProductsSeed {
    constructor(
        @InjectRepository(Products) private readonly productRepository: Repository<Products>,
        @InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>,
    ){}
    async findCategoryByName(category: string) {
    const foundCategory = await this.categoriesRepository.findOne({
        where: { name: category },
    });

    if (!foundCategory) {
        throw new Error(`Category ${category} not found`);
    }
    return foundCategory;  // Retornar solo el ID
}

async seed() {
    const existingProductNames = (
        await this.productRepository.find()
    ).map((product) => product.name);

    for (const productData of productMock) {
        if (!existingProductNames.includes(productData.name)) {
            const product = new Products();
            product.name = productData.name;
            product.description = productData.description;
            product.price = productData.price;
            product.stock = productData.stock;
            const category = await this.findCategoryByName(productData.category);
            product.category_id = category;  // Guardas solo el ID
            await this.productRepository.save(product);

        }
    }
}


}