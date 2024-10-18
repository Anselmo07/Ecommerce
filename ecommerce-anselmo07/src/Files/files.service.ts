import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./files.entity";
import { Repository } from "typeorm";
import { Products } from "src/Products/products.entity";
import { CloudinaryService } from "src/Cloudinary/cloudinary.service";

@Injectable()
export class FilesService {
    constructor(@InjectRepository(File) private readonly filesRepository: Repository<File>, 
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Products) private readonly productsRepository: Repository<Products>
){}

    async uploadImageToCloudinaryAndSaveProduct(file: Express.Multer.File, productId: string) {

        const uploadResult = await this.cloudinaryService.uploadImage(file);

        const product = await this.productsRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }

        product.imgUrl = uploadResult.secure_url;
        const updatedProduct = await this.productsRepository.save(product);

        const newFile = this.filesRepository.create({
            name: file.originalname,
            mimeType: file.mimetype,
            data: file.buffer,
        });

        const savedFile = await this.filesRepository.save(newFile);

        return {
            message: 'Imagen subida y archivo guardado correctamente',
            product: updatedProduct,
            file: savedFile,
        };
    }
}