import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { OrdersModule } from './orders/orders.module';
import { FileModule } from './Products/Files/files.module';
import { CategoriesModule } from './categories/categories.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[typeOrmConfig],
  }), TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get('typeorm'),
  }), 
  UsersModule, ProductsModule, AuthModule, OrdersModule, FileModule, CategoriesModule, JwtModule.register({global: true, signOptions:{ expiresIn:'1h'}, secret: process.env.JWT_SECRET})],
  controllers: [],
  providers: [],
})
export class AppModule {}
