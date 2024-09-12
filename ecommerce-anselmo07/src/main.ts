import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGloblal } from './middlewares/logger.middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGloblal);
  await app.listen(3000);
}
bootstrap();
