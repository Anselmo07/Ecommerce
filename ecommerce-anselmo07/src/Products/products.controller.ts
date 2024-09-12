import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prodcuts } from './products.interface';
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
    return this.productsService.getProductsById(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard)
  createProducts(@Body() products: Prodcuts):Promise<Prodcuts>{
    return this.productsService.createProducts(products);
  }  
  
  @Put()
  @UseGuards(AuthGuard)
  updateProducts(@Param('id') id : string, @Body() products: Prodcuts){
    return this.productsService.updateProducts(Number(id), products);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProductsById(@Param('id')id: string){
    return this.productsService.deleteProductsById(Number(id));
  }
}
