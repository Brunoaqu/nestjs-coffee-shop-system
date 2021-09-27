import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //[POST] http://localhost:3000/api/products/
  //Cadastra produto
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  //[GET] http://localhost:3000/api/products/
  //Seleciona todos os produtos
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async index() {
    return await this.productsService.findAll();
  }
  
  //[GET] http://localhost:3000/api/products/[nome]
  //Seleciona um produto pelo nome
  @Get(':name')
  async find(@Param('name') name: string) {
    return await this.productsService.findOne(name);
  }

  //[GET] http://localhost:3000/api/products/custo/[nome]
  //Seleciona um produto e calcula quanto ele custa
  @Get('custo/:name')
  async findprice(@Param('name') name: string) {
    return await this.productsService.findprice(name);
  }

  //[PATCH] http://localhost:3000/api/products/[nome]
  //Atualiza um produto
  @UseGuards(AuthGuard('jwt'))
  @Patch(':name')
  async update(@Param('name') name: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(name, updateProductDto);
  }

  //[DELETE] http://localhost:3000/api/products/[nome]
  //Deleta um produto
  @Delete(':name')
  async remove(@Param('name') name: string) {
    return await this.productsService.remove(name);
  }
}