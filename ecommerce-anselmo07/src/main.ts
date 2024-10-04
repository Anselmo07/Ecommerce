import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGloblal } from './middlewares/logger.middlewares';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(loggerGloblal);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('My Ecommerce')
    .setDescription(`Esta es una API construida con Nest, sobre mi proyecto de backend del modulo 4 de Henry`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
