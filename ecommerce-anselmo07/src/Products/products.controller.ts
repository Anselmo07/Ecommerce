import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { AuthGuard } from 'src/Auth/auth.guard';
import { UUIDValidationPipe } from 'src/validator/uuid-validation.pipe';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/Auth/roles.enum';
import { RolesGuard } from 'src/Auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}  

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getProdcutsById(@Param('id', UUIDValidationPipe) id:string): Promise<Products>{
    return this.productsService.getProductsById(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  createProducts(@Body() products: Products):Promise<Products>{
    return this.productsService.createProducts(products);
  }  
  
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  updateProducts(@Param('id', UUIDValidationPipe) id : string, @Body() products: Products){
    return this.productsService.updateProducts(String(id), products);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProductsById(@Param('id', UUIDValidationPipe)id: string){
    return this.productsService.deleteProductsById(String(id));
  }
}
