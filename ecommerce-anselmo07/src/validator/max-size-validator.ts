import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class MaxSizeValidatorPipe implements PipeTransform {
    transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
        const maxSize = 200000;

        if (!file || !file.size) {
            throw new BadRequestException('El archivo no es válido o está vacío');
        }

        if (file.size > maxSize) {
            throw new BadRequestException(`El tamaño del archivo supera los ${maxSize / 1000}KB`);
        }

        return file;
    }
}
