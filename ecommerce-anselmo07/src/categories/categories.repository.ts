import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories} from "src/entity/categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class categoriesRepository{
    constructor(@InjectRepository(Categories)
    private readonly categoriesRepository: Repository <Categories>){}

    async getCategories():Promise<Categories[]>{
        return this.categoriesRepository.find();
    }

    async addCategories(newCategories: Categories[]): Promise<void> {
        
        for (const categories of newCategories) {
            const categoriesCount = await this.categoriesRepository.count({ where: { name: categories.name } });

            if (categoriesCount === 0) {
            await this.categoriesRepository.save(categories);
            }
        }
    }    
}