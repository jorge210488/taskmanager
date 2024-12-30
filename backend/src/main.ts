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
  const port = configService.get<number>('PORT');

  app.enableCors({
    origin: '*',
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
    .setTitle('Taskmanager Backend API')
    .setDescription(
      'Bienvenido a la documentación de la API del Backend de Taskmanager. Esta aplicación está desarrollada utilizando tecnologías modernas como TypeScript, NestJS, JWT, y Swagger para proporcionar una experiencia robusta y segura.\n\n' +
        '### Características principales:\n' +
        '- **TypeScript**: Garantiza un desarrollo escalable y mantenible.\n' +
        '- **NestJS**: Framework eficiente y modular para construir aplicaciones del lado del servidor.\n' +
        '- **JWT (JSON Web Tokens)**: Manejo seguro de la autenticación y autorización.\n' +
        '- **Swagger**: Documentación interactiva para explorar y probar las rutas disponibles.\n' +
        '- **Express Validator**: Validación de datos robusta y eficiente para las entradas.\n\n' +
        '### Consideraciones importantes:\n' +
        '1. Todas las rutas están protegidas mediante autenticación con JWT. Esto garantiza que solo los usuarios autenticados puedan acceder a las funcionalidades del sistema.\n' +
        '2. **Primer paso**: Lo primero que debes hacer es crear un usuario utilizando la ruta de registro. Una vez registrado, debes iniciar sesión para obtener un token de autenticación.\n' +
        '3. Usa el token de autenticación (Bearer Token) para interactuar con las demás rutas protegidas del sistema, como la gestión de tareas, usuarios y otras operaciones avanzadas.\n\n' +
        'Esta documentación interactiva te permitirá explorar cada uno de los endpoints, ver los parámetros necesarios, y obtener ejemplos de respuestas. ¡Comienza creando tu usuario y explora todas las funcionalidades!',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`🚀 Server running on port: ${port}`);
  await app.listen(port);
}
bootstrap();
