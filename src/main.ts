import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = 8080;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não declaradas no DTO
      transform: true, // Habilita a transformação automática do payload
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Reinos de Eldoria API')
    .setDescription(
      'API oficial do jogo Reinos de Eldoria. Gerenciamento de contas, personagens, batalhas, monstros e progressão.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  console.log('SERVIDOR RODANDO NA PORTA', port);
}
bootstrap();
