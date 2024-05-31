import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';


@Module({
  controllers: [UserController, CustomersController],
  providers: [UsersService, CustomersService]
})
export class UsersModule {}
