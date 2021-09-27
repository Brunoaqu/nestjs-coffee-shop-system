import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//PORTA NA QUAL O SERVIDOR É INICIALIZADO
const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Inicializa o uso de validações
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();

/*
  Dentro dos controllers de cada objeto a os links para acessa-los
*/ 