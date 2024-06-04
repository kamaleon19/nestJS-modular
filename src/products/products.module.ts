import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService]   // HEMOS IMPORTADO EL SERVICIO DE PRODUCTOS. SOLAMENTE SE PODRAN USAR LOS SERVICIOS O CONTROLADORES QUE ESTEN ADENTRO DE ESE ARRAY.

})
export class ProductsModule {}
