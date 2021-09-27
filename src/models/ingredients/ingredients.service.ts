import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient, IngredientDocument } from 'src/schemas/ingredients.schema';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(@InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>) {}
  
  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    try{
      const obj = await new this.ingredientModel(createIngredientDto).save();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Ingredient[]> {
    try{
      const obj = await this.ingredientModel.find().exec();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(name: string): Promise<Ingredient> {
    try{
      const obj = await this.ingredientModel.findOne({name}).exec();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(name: string, updateIngredientDto: UpdateIngredientDto): Promise<Ingredient> {
    try{
      const obj = await this.ingredientModel.findOneAndUpdate({name}, {$set: {...updateIngredientDto}}).exec();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(name: string): Promise<Ingredient> {
    try{
      const obj = await this.ingredientModel.findOneAndDelete({name});
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
