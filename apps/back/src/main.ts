import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/core/core.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import environment from 'environments/environment';
import Swagger from 'src/shared/lib/swagger/init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const swagger = new Swagger(app);
  app.setGlobalPrefix(globalPrefix);
  await app.listen(environment.port);
  swagger.status();
  Logger.log(
    `🚀 Application is running on: http://localhost:${environment.port}/${globalPrefix}`,
  );
}
bootstrap();
