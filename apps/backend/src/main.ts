import 'dotenv/config'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import produtorRoutes from './routes/produtor.router';
import express from 'express'
import propriedadeRoutes from './routes/propriedade.router';
import safraRoutes from './routes/safra.router';
import culturaRoutes from './routes/cultura.router';
import dashboardRoutes from './routes/dashboard.routes';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json())
  app.use(produtorRoutes)
  app.use(propriedadeRoutes)
  app.use(safraRoutes)
  app.use(culturaRoutes)
  app.use(dashboardRoutes)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
