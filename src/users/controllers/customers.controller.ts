import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  PayloadTooLargeException,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersServices: CustomersService) {}

  @Get()
  getCustomers(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.customersServices.findAll();
  }

  @Get(':customerId')
  getOne(@Param('customerIde', ParseIntPipe) customerId: number) {
    return this.customersServices.findOne(customerId);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersServices.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return this.customersServices.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersServices.remove(id);
  }
}
