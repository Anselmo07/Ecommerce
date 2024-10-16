import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { ProductsSeed } from 'src/seed/products/products.seed';
import { CategoriesSeed } from 'src/seed/categories/categories.seed';
import { categoriesRepository } from 'src/categories/categories.repository';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([Products]),forwardRef(() => CategoriesModule) ],
  providers: [ProductsService, ProductsRepository,ProductsSeed, ],
  controllers: [ProductsController],
  exports:[ProductsRepository, ProductsService,ProductsSeed,]
})
export class ProductsModule {}
