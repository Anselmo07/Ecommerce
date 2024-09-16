import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Products } from "src/Products/products.entity";

export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;
    
    @IsArray()
    @ArrayMinSize(1, { message: 'Debe haber al menos un producto en la orden.' })
    @ValidateNested({ each: true })
    products:[];
}