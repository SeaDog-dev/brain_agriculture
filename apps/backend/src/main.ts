import 'dotenv/config'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import produtorRoutes from './routes/produtor.router';
import express from 'express'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json())
  app.use(produtorRoutes)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
