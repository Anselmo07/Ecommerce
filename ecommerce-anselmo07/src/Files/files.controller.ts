import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { UUIDValidationPipe } from "src/validator/uuid-validation.pipe";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductsService } from "src/Products/products.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AuthGuard } from "src/Auth/auth.guard";
import { MaxSizeValidatorPipe } from "src/validator/max-size-validator";
import { CloudinaryService } from "src/Cloudinary/cloudinary.service";
import { File } from "./files.entity";

@ApiTags('Products')
@Controller('files')
export class FileController{
    constructor(private readonly fileService: FilesService, private readonly productsService: ProductsService,  private readonly cloudinaryService: CloudinaryService){}
    
    @ApiBearerAuth()
    @Post('/uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data') // Indicar que acepta multipart/form-data
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            image: { type: 'string', format: 'binary' }, // Campo para subir imagen
        },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Imagen subida y guardada correctamente',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                product: { 
                    type: 'object', 
                    properties: {
                        id: { type: 'string' },
                        imgUrl: { type: 'string' },
                    }
                },
                
                file:{$ref: getSchemaPath(File)
                },    
            }
        }
    })
    async getUserImages(@Param('id') id: string, @UploadedFile(MaxSizeValidatorPipe) file: Express.Multer.File){
        
        const updatedProduct = await this.fileService.uploadImageToCloudinaryAndSaveProduct(file, id);
        return {
            message: 'Imagen actualizada correctamente',
            product: updatedProduct,
            file,
        };
    }

}