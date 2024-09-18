import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UUIDValidationPipe } from "src/validator/uuid-validation.pipe";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductsService } from "../products.service";

@Controller('files')
export class FileController{
    constructor(private readonly fileService: FilesService, private readonly productsService: ProductsService){}
    
    @Post('uploadImage')
    @UseInterceptors(FileInterceptor('file'))
    async createFile(@Body ('id') id:string, @UploadedFile() file: Express.Multer.File){
        const products = await this.productsService.getProductsById(id);
        return this.fileService.createFile({
            name: file.originalname,
            mimeType: file.mimetype,
            data: file.buffer,
            products
        });
    }
    
}