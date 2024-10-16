import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { OrdersModule } from './orders/orders.module'; 
import { CategoriesModule } from './categories/categories.module';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from './Files/files.module';
import { CategoriesSeed} from './seed/categories/categories.seed';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[typeOrmConfig],
  }), TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get('typeorm'),
  }), 
  UsersModule,  CategoriesModule, ProductsModule, AuthModule, OrdersModule, FileModule, JwtModule.register({global: true, signOptions:{ expiresIn:'1h'}, secret: process.env.JWT_SECRET})],
  controllers: [],
  providers: [],
})
export class AppModule {}
