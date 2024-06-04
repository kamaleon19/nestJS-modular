import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { ProductsModule } from 'src/products/products.module';


@Module({
  imports: [ProductsModule], // HEMOS IMPORTADO EL MODULO DE PRODUCTS. CABE RECALCAR QUE SOLO PODREMOS USAR LO QUE LOS CONTROLADORES O SERVICIOS EXPORTADOS.
  controllers: [UserController, CustomersController],
  providers: [UsersService, CustomersService]
})
export class UsersModule {}
