import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from "./products.entity";


@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository){}
  
  getProducts(): Promise<Products[]> {
    return this.productsRepository.getProducts();
  }

  getProductsById(id: string): Promise<Products>{
    return this.productsRepository.getProductsById(id);
  }

  createProducts(products: Products): Promise<Products>{
    return this.productsRepository.createProducts(products);
  }

  updateProducts(id: string, products:Products):Promise<Products>{
    return this.productsRepository.updateProducts(id, products);
  }

  deleteProductsById(id: string): Promise<void> {
    return this.productsRepository.deleteProductsById(id);
  }

  
}
