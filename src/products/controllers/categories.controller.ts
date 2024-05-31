import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService){}

  @Get()
  getCategories(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ){
    return this.categoriesService.findAll()
  }

  @Get(':categoryId')
  getOne(@Param('categoryId', ParseIntPipe) categoryId: number ){
    return this.categoriesService.findOne(categoryId)
  }

  @Post()
  create(@Body() payload: CreateCategoryDto){
    return this.categoriesService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCategoryDto){
    return this.categoriesService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id') id :number){
    return this.categoriesService.remove(id)
  }
}
