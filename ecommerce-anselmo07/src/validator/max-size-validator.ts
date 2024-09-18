import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class MaxSizeValidatorPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const maxSize = 200000;

        if(value.size > maxSize){
            throw new BadRequestException('El tamano del archivo es muy grande');
        }
        return value;
    }
}