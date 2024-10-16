import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { AuthGuard } from "src/Auth/auth.guard";
import { AuthModule } from "src/Auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Orders } from "src/entity/orders.entity";
import { OrdersRepository } from "src/orders/orders.repository";
import { ProductsRepository } from "src/Products/products.repository";
import { ProductsModule } from "src/Products/products.module";
import { CloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryService } from "src/Cloudinary/cloudinary.service";
import { UsersSeed } from "src/seed/user/userSeed";


@Module({
    imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Users, Orders]), ProductsModule],
    providers: [UsersService, UsersRepository, CloudinaryConfig, CloudinaryService, UsersSeed],
    controllers: [UsersController],
    exports:[UsersRepository, UsersService,],
})
export class UsersModule {}