import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nest App')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('No')
    .addBearerAuth
    // {
    //   type: 'http',
    //   scheme: 'bearer',
    //   bearerFormat: 'JWT',
    //   name: 'Authorization',
    //   description: 'Enter JWT token',
    //   in: 'header',
    // },
    // 'access-token',
    ()
    .build();

  const documentFactory = () => {
    const document = SwaggerModule.createDocument(app, config);
    // document.components = {
    //   securitySchemes: {
    //     bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   },
    // };
    // document.paths = Object.keys(document.paths).reduce((acc, path) => {
    //   acc[path] = Object.keys(document.paths[path]).reduce(
    //     (accMethods, method) => {
    //       accMethods[method] = {
    //         ...document.paths[path][method],
    //         security: [{ bearerAuth: [] }],
    //       };
    //       return accMethods;
    //     },
    //     {},
    //   );
    //   return acc;
    // }, {});

    return document;
  };
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
