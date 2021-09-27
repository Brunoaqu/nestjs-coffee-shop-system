import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stockobject, StockobjectDocument } from 'src/schemas/stockobjects.schema';
import { CreateStockobjectDto } from './dto/create-stockobject.dto';
import { UpdateStockobjectDto } from './dto/update-stockobject.dto';

@Injectable()
export class StockobjectsService {
  constructor(@InjectModel(Stockobject.name) private stockobjectModel: Model<StockobjectDocument>) {}
  
  async create(createStockobjectDto: CreateStockobjectDto): Promise<Stockobject> {
    try{
      const obj = await new this.stockobjectModel(createStockobjectDto).save();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Stockobject[]> {
    try{
      const obj = await this.stockobjectModel.find().exec();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(name: string): Promise<Stockobject> {
    try{
      const obj = await this.stockobjectModel.findOne({name}).exec();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(name: string, updateStockobjectDto: UpdateStockobjectDto): Promise<Stockobject> {
    try{
      const obj = await this.stockobjectModel.findOneAndUpdate({name}, {$set: {...updateStockobjectDto}}).exec();
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(name: string): Promise<Stockobject> {
    try{
      const obj = await this.stockobjectModel.findOneAndDelete({name});
      if(!obj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }
      return obj;
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async checkbuy(name: string, quantity: number) {
    try{
      const stockobj = await this.stockobjectModel.findOne({name}).exec();
      if(!stockobj){
        throw new HttpException(`Not found`, HttpStatus.NOT_FOUND)
      }

      if (stockobj.quantity <= quantity){
        console.log(stockobj.quantity);
        console.log(quantity);
        const obj = {
          _id: stockobj._id,
          name: stockobj.nameObject,
          compra: "aprovado"
        };
        return obj;
      }else{
        const obj = {
          _id: stockobj._id,
          name: stockobj.nameObject,
          compra: "negado"
        };
        return obj;
      }
    }catch(err){
      throw new HttpException(`Callback: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
