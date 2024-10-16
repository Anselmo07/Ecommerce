import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "src/entity/categories.entity";
import { categoriesRepository } from "./categories.repository";
import { categoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { CategoriesSeed} from "src/seed/categories/categories.seed";

@Module({
    imports:[TypeOrmModule.forFeature([Categories]),],
    providers:[categoriesRepository, categoriesService, CategoriesSeed,],
    controllers:[CategoriesController],
    exports:[categoriesRepository, categoriesService, CategoriesSeed, TypeOrmModule],
})

export class CategoriesModule{}