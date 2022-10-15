import { CatsModule } from './cats/cats.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { loggerMiddleware } from './logger.middleware';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CatsModule, MorganModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware)
      .exclude({ path: '/cats', method: RequestMethod.GET })
      .forRoutes('/cats');
  }
}
