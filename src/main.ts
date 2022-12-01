import * as dotenv from "dotenv";
dotenv.config();
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { TimeoutInterceptor } from "./common/timeout.interceptor";
import { config } from "./swagger/config";
import { join } from "path";
import { userConstants } from "./users/constants";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
    },
    }),
  );
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  app.useStaticAssets(join(__dirname, '..', userConstants.avatarPath), {
    prefix: userConstants.avatarPath,
  });
  await app.listen(3000);
}

bootstrap();
