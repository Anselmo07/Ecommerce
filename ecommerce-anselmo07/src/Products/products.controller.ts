import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get('id')
  getProdcutsById(@Param('id') id:string){
    return this.productsService.getProductsById(String(id));
  }

  @Post()
  @UseGuards(AuthGuard)
  createProducts(@Body() products: Products):Promise<Products>{
    return this.productsService.createProducts(products);
  }  
  
  @Put()
  @UseGuards(AuthGuard)
  updateProducts(@Param('id') id : string, @Body() products: Products){
    return this.productsService.updateProducts(String(id), products);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProductsById(@Param('id')id: string){
    return this.productsService.deleteProductsById(String(id));
  }
}
