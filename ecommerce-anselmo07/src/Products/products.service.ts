import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Prodcuts } from './products.interface';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository){}
  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductsById(id: number){
    return this.productsRepository.getProductsById(id);
  }

  createProducts(products: Prodcuts): Promise<Prodcuts>{
    return this.productsRepository.createProducts(products);
  }

  updateProducts(id: number, products:Prodcuts):Promise<Prodcuts>{
    return this.productsRepository.updateProducts(id, products);
  }

  deleteProductsById(id: number){
    return this.productsRepository.deleteProductsById(id);
  }

  
}
