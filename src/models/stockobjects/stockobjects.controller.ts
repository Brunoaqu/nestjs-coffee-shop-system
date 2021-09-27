import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockobjectsService } from './stockobjects.service';
import { CreateStockobjectDto } from './dto/create-stockobject.dto';
import { UpdateStockobjectDto } from './dto/update-stockobject.dto';

@Controller('api/stockobjects')
export class StockobjectsController {
  constructor(private readonly stockobjectsService: StockobjectsService) {}

  //[POST] http://localhost:3000/api/stockobjects/
  //Cadastra um produto ou ingrediente dentro do estoque com quantidade
  @Post()
  async create(@Body() createStockobjectDto: CreateStockobjectDto) {
    return await this.stockobjectsService.create(createStockobjectDto);
  }

  //[GET] http://localhost:3000/api/stockobjects/
  //Selecione os objetos dentro do estoque
  @Get()
  async index() {
    return await this.stockobjectsService.findAll();
  }

  //[GET] http://localhost:3000/api/stockobjects/[nome]
  //Selecione os objetos dentro do estoque pelo nome
  @Get(':name')
  async find(@Param('name') name: string) {
    return await this.stockobjectsService.findOne(name);
  }

  //[GET] http://localhost:3000/api/stockobjects/checkbuy/[nome]/quantity
  //Selecione os objetos dentro do estoque e verifica se a quantidade que o cliente deseja comprar está disponivel
  @Get('checkbuy/:name/:quantity')
  async checkbuy(@Param('name') name: string, @Param('quantity') quantity: number) {
    return await this.stockobjectsService.checkbuy(name, quantity);
  }

  //[PATCH] http://localhost:3000/api/stockobjects/[nome]
  //Atualiza um objeto pelo nome
  @Patch(':name')
  async update(@Param('name') name: string, @Body() updateStockobjectDto: UpdateStockobjectDto) {
    return await this.stockobjectsService.update(name, updateStockobjectDto);
  }

  //[DELETE] http://localhost:3000/api/stockobjects/[nome]
  //Deleta um objeto
  @Delete(':name')
  async remove(@Param('name') name: string) {
    return await this.stockobjectsService.remove(name);
  }
}
