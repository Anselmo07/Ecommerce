import { forwardRef, Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileController } from "./files.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./files.entity";
import { ProductsModule } from "src/Products/products.module";
import { CloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryService } from "src/Cloudinary/cloudinary.service";
import { AuthModule } from "src/Auth/auth.module";
import { ProductsRepository } from "src/Products/products.repository";
import { Products } from "src/Products/products.entity";

@Module({
    imports:[TypeOrmModule.forFeature([File, Products]), ProductsModule, forwardRef(() => AuthModule)],
    providers:[FilesService,CloudinaryConfig, CloudinaryService, ],
    controllers:[FileController]
})
export class FileModule {}