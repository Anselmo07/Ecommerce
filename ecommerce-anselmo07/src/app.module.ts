import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[typeOrmConfig],
  }), TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get('typeorm'),
  }), 
  UsersModule, ProductsModule, AuthModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
