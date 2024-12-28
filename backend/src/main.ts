import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './filters/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .setDescription(
      `
      Bienvenido a la documentación de la API del Backend. Esta aplicación está desarrollada utilizando TypeScript y el framework NestJS, siguiendo las mejores prácticas para construir un backend escalable y mantenible.
  
      ### Características Principales:
      - **Módulo de Autenticación**: Permite el registro de usuarios, inicio de sesión y acceso seguro a los recursos mediante autenticación basada en JWT.
      - **Módulo de Tareas (Task)**: Proporciona funcionalidades para la gestión de tareas, incluyendo creación, actualización, consulta y eliminación, con soporte para filtrar por estado (completadas o pendientes).
  
      ### Base de Datos:
      La aplicación utiliza MongoDB como base de datos, ofreciendo alto rendimiento y flexibilidad para manejar datos estructurados y semi-estructurados.
  
      ### Herramientas y Utilidades:
      - Integración con Swagger para la documentación y pruebas de la API.
      - Validación de datos mediante pipes globales para garantizar la integridad.
      - Filtros de excepciones personalizados para un manejo uniforme de errores.
  
      ### Introducción:
      Para interactuar con la API, utiliza los endpoints que se describen a continuación. Asegúrate de estar autenticado con un token Bearer válido para acceder a las rutas protegidas.
    `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
