import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { ResponseOkInterceptor } from './common/interceptors/global-response.interceptor';
import { AppConfigService } from './config/app/app-config.service';
import { logger } from './config/logger/logger.class';
import { SwaggerConfigService } from './config/swagger/swagger.service';
import { HttpExceptionFilter } from './common/exceptions/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(logger.config),
  });
  const appService = <AppConfigService>app.get(AppConfigService);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix(appService.appApiPrefix);
  // app.useGlobalPipes(new LetterTransformPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseOkInterceptor());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const appConfigService = app.get<AppConfigService>(AppConfigService);
  const swaggerConfig = app.get<SwaggerConfigService>(SwaggerConfigService);
  const port = appConfigService.appPort || 4000;
  app.setGlobalPrefix(appConfigService.appApiPrefix);
  Logger.log(`Swagger Is Enable In DEVELOPMENT Mode`, 'Swagger');
  swaggerConfig.init(app);
  await app.listen(port).then(async () => {
    Logger.log(`Running`, 'Swagger');
    Logger.log(
      `http://127.0.0.1:${port}/${appConfigService.appApiPrefix}`,
      'Running Server',
    );
    Logger.log(
      `http://127.0.0.1:${port}/${swaggerConfig.preFix}`,
      'Running Swagger',
    );
  });
}
bootstrap();
