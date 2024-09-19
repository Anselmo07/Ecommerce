import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "src/entity/categories.entity";
import { categoriesRepository } from "./categories.repository";
import { categoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Categories])],
    providers:[categoriesRepository, categoriesService],
    controllers:[CategoriesController],
    exports:[categoriesRepository, categoriesService],
})

export class CategoriesModule{}