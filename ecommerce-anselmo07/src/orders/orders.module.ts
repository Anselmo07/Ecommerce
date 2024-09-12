import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { OrdersController } from "./orders.controller";
import { OrderDetails } from "src/entity/orderDetails.entity";
import { Orders } from "src/entity/orders.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/Products/products.entity";
import { Users } from "src/Users/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Products, Users])],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository],
})

export class OrdersModule {}