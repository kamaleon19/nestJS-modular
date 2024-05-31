import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsServices: BrandsService) {}

  @Get()
  getBrands(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.brandsServices.findAll();
  }

  @Get(':brandId')
  getOne(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsServices.findOne(brandId);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsServices.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateBrandDto) {
    return this.brandsServices.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandsServices.remove(id);
  }
}
