import { Body, Controller, Get, Post } from "@nestjs/common";
import { categoriesService } from "./categories.service";
import { Categories } from "src/entity/categories.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
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
    addCategories(@Body() categories: Categories[]){
        return this.categoriesService.addCategories(categories);
    }

}