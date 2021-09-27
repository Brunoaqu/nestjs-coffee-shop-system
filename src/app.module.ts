import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './models/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientsModule } from './models/ingredients/ingredients.module';
import { StockobjectsModule } from './models/stockobjects/stockobjects.module';
import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';

//Link para o banco de dados / Configurado para rodar em docker
const MONGODBLINK = 'mongodb://mongodb/nest';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODBLINK),
    ProductsModule, 
    IngredientsModule,
    StockobjectsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
