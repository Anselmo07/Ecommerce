import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';

@Module({
  imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([Products]) ],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports:[ProductsRepository, ProductsService]
})
export class ProductsModule {}
