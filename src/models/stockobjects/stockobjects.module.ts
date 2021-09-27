import { Module } from '@nestjs/common';
import { StockobjectsService } from './stockobjects.service';
import { StockobjectsController } from './stockobjects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stockobject, StockobjectSchema } from 'src/schemas/stockobjects.schema';
// import { Stockobject, StockobjectSchema } from 'src/schemas/stockobjects.schema';
// import { Product, ProductSchema } from 'src/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stockobject.name, schema: StockobjectSchema }]),
    //MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [StockobjectsController],
  providers: [StockobjectsService]
})
export class StockobjectsModule {}