import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { UUIDValidationPipe } from "src/validator/uuid-validation.pipe";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductsService } from "src/Products/products.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/Auth/auth.guard";
import { MaxSizeValidatorPipe } from "src/validator/max-size-validator";
import { CloudinaryService } from "src/Cloudinary/cloudinary.service";

@ApiTags('Products')
@Controller('files')
export class FileController{
    constructor(private readonly fileService: FilesService, private readonly productsService: ProductsService,  private readonly cloudinaryService: CloudinaryService){}
    
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
    
    // CHEQUEAR H7
    @Post('/uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(MaxSizeValidatorPipe)
    async getUserImages(@Param('id') id: string, @UploadedFile() file: Express.Multer.File){
        const updatedProduct = await this.fileService.uploadImageToCloudinaryAndSaveProduct(file, id);

    return {
        message: 'Imagen actualizada correctamente',
        product: updatedProduct,
    };
    }
}