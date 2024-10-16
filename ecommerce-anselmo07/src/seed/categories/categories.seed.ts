import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { categoriesRepository } from "src/categories/categories.repository";
import { Categories } from "src/entity/categories.entity";
import { In, Repository } from "typeorm";
import { categories } from "./categories-mock";

@Injectable()
export class CategoriesSeed{
    constructor(
        @InjectRepository(Categories)
        private readonly categorieRepository: Repository<Categories>,
){}

async seed() {
    const existingCategories = await this.categorieRepository.find({
        where:{ name: In(categories)},
    });

    for(const categoryName of categories){
        if(
            !existingCategories.some((category)=> category.name === categoryName)
        ){
            const category = new Categories();
            category.name = categoryName;
            await this.categorieRepository.save(category)
        }
    }
}


}