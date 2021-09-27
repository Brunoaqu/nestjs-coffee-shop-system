import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  //[POST] http://localhost:3000/api/ingredients
  //Cadastra um ingrediente
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return await this.ingredientsService.create(createIngredientDto);
  }

  //[GET] http://localhost:3000/api/ingredients
  //Seleciona todos os ingredientes
  @Get()
  async index() {
    return await this.ingredientsService.findAll();
  }

  //[GET] http://localhost:3000/api/ingredients/[nome]
  //Seleciona um ingrediente pelo nome
  @Get(':name')
  async find(@Param('name') name: string) {
    return await this.ingredientsService.findOne(name);
  }

  //[PATCH] http://localhost:3000/api/ingredients/[nome]
  //Atualiza informações dos Ingredientes
  @UseGuards(AuthGuard('jwt'))
  @Patch(':name')
  async update(@Param('name') name: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return await this.ingredientsService.update(name, updateIngredientDto);
  }
  
  //[DELETE] http://localhost:3000/api/ingredients/[nome]
  //Deleta Ingredientes
  @UseGuards(AuthGuard('jwt'))  
  @Delete(':name')
  async remove(@Param('name') name: string) {
    return await this.ingredientsService.remove(name);
  }
}