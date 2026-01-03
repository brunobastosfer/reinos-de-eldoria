import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não declaradas no DTO
      transform: true, // Habilita a transformação automática do payload
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(port);
  console.log("SERVIDOR RODANDO NA PORTA", port)
}
bootstrap();
