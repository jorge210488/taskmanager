import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './filters/exceptions.filter';
import { loggerGlobal } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const frontendOrigin = configService.get<string>('FRONTEND_URL');
  const port = configService.get<number>('PORT');

  console.log(`🌐 Frontend Origin: ${frontendOrigin}`);

  app.enableCors({
    origin: frontendOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(loggerGlobal);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('Bienvenido a la documentación de la API del Backend...')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`🚀 Server running on port: ${port}`);
  await app.listen(port);
}
bootstrap();
