import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { categories } from "src/entity/categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class categoriesRepository{
    constructor(@InjectRepository(categories)
    private readonly categories: Repository <categories>){}

    async getCategories():Promise<categories[]>{
        return this.categories.find();
    }

    async addCategories(newCategories: categories[]): Promise<void> {
        
        for (const categories of newCategories) {
            const categoriesCount = await this.categories.count({ where: { name: categories.name } });

            if (categoriesCount === 0) {
            await this.categories.save(categories);
            }
        }
    }    
}