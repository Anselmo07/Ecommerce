import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileController } from "./files.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./files.entity";
import { ProductsModule } from "src/Products/products.module";

@Module({
    imports:[TypeOrmModule.forFeature([File]), ProductsModule],
    providers:[FilesService,],
    controllers:[FileController]
})
export class FileModule {}