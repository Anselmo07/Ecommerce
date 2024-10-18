import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Products } from "src/Products/products.entity";

export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Id'
    })
    userId: string;
    
    @IsArray()
    @ArrayMinSize(1, { message: 'Debe haber al menos un producto en la orden.' })
    @ValidateNested({ each: true })
    @ApiProperty({
        type: [Products],
        description: 'Array of products included in the order',
        example: [
        { id: 'a5428bfd-21eb-4ff0-9c27-4e5573191a4f' },
        { id: '9729e3a1-4126-447c-ae1d-2ac60f82e14e' },
    ],
    })
    products:[];
}