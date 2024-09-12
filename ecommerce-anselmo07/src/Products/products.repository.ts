import { Injectable, NotFoundException} from "@nestjs/common";
import { Prodcuts } from "./products.interface";

@Injectable()
export class ProductsRepository {
    private products : Prodcuts[] = [
        // {
        //     id:number,
        //     name: string,
        //     description: string,
        //     price: number,
        //     stock: boolean,
        //     imgUrl: string,
        // }
        {
            id: 1,
            name: "Laptop Pro",
            description: "High-performance laptop with 16GB RAM and 512GB SSD.",
            price: 1200,
            stock: true,
            imgUrl: "https://example.com/images/laptop-pro.jpg",
        },
        {
            id: 2,
            name: "Wireless Headphones",
            description: "Noise-cancelling wireless headphones with Bluetooth 5.0.",
            price: 150,
            stock: true,
            imgUrl: "https://example.com/images/wireless-headphones.jpg",
        },
        {
            id: 3,
            name: "Smartphone X",
            description: "Latest model smartphone with a powerful processor and great camera.",
            price: 800,
            stock: false,
            imgUrl: "https://example.com/images/smartphone-x.jpg",
        },
    ]

    async getProducts() {
        return this.products;
    }

    async getProductsById(id: number){
        return this.products.find(products => products.id === id);
    }

    async createProducts(products: Prodcuts){
        const id = this.products.length + 1;
        this.products = [...this.products, {id, ...products}]
        return {id, ...products};
    }

    async updateProducts(id: number, products:Prodcuts){
        const buscarId = this.products.findIndex((products) => products.id === id);
        
        if (buscarId === -1) {
            throw new NotFoundException(`Usuario con ID ${products} no encontrado`);
        }

        this.products[buscarId] = { ...this.products[buscarId], ...products };
        return this.products[buscarId];
    }

    async deleteProductsById(id: number){
        this.products = this.products.filter(products=>products.id !== id);
    }
}