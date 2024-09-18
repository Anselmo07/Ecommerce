import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { AuthGuard } from 'src/Auth/auth.guard';
import { UUIDValidationPipe } from 'src/validator/uuid-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProdcutsById(@Param('id', UUIDValidationPipe) id:string): Promise<Products>{
    return this.productsService.getProductsById(id);
  }

  @Post()
  // @UseGuards(AuthGuard)
  createProducts(@Body() products: Products):Promise<Products>{
    return this.productsService.createProducts(products);
  }  
  
  @Put()
  @UseGuards(AuthGuard)
  updateProducts(@Param('id', UUIDValidationPipe) id : string, @Body() products: Products){
    return this.productsService.updateProducts(String(id), products);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProductsById(@Param('id', UUIDValidationPipe)id: string){
    return this.productsService.deleteProductsById(String(id));
  }

}
