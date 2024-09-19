import { Injectable } from "@nestjs/common";
import { Categories } from "src/entity/categories.entity";
import { categoriesRepository } from "./categories.repository";

@Injectable()
export class categoriesService{
    constructor(private readonly categoriesRepository: categoriesRepository){
    }

    getCategories(): Promise<Categories[]>{
        return this.categoriesRepository.getCategories();
    }

    addCategories(categories: Categories[]): Promise<void> {
        return this.categoriesRepository.addCategories(categories);
    }        
}