import { Injectable } from "@nestjs/common";
import { categories } from "src/entity/categories.entity";
import { categoriesRepository } from "./categories.repository";

@Injectable()
export class categoriesService{
    constructor(private readonly categoriesRepository: categoriesRepository){
    }

    getCategories(): Promise<categories[]>{
        return this.categoriesRepository.getCategories();
    }

    addCategories(categories): Promise<void> {
        return this.categoriesRepository.addCategories(categories);
    }        
}