import { Controller, Get, Post } from "@nestjs/common";
import { categoriesService } from "./categories.service";
import { categories } from "src/entity/categories.entity";

@Controller("categories")
export class CategoriesController{
    constructor(private readonly categoriesService: categoriesService){}
    
    @Get()
    getCategories(){
        return this.categoriesService.getCategories();
    }

    @Get('seeder')
    seedCategories(){
        // return this.categoriesService.seedCategories();
    }

    @Post()
    addCategories(){
        return this.categoriesService.addCategories(categories);
    }

}