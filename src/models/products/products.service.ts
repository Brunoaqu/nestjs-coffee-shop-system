import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient, IngredientDocument } from 'src/schemas/ingredients.schema';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try{
      const obj = await new this.productModel(createProductDto).save();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Product[]> {
    try{
      const obj = await this.productModel.find().exec();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(name: string): Promise<Product> {
    try{
      const obj = await this.productModel.findOne({name}).exec();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(name: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try{
      const obj = await this.productModel.findOneAndUpdate({name}, {$set: {...updateProductDto}}).exec();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(name: string): Promise<Product> {
    try{
      const obj = await this.productModel.findOneAndDelete({name});
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findprice(name: string)  {
    try{
      const product = await this.productModel.findOne({name}).exec();
      if(!product){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      const ingredients = product.ingredients;
      let total = 0;
      
      for(let i = 0; i< ingredients.length; i++){
        let names = ingredients[i][0];
        const price = await this.ingredientModel.findOne({names}).select('price -_id').exec();
        total += price.price * ingredients[i][1];
      }

      let obj = {
        _id: product._id,
        name: product.name,
        custo: total
      };

      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
