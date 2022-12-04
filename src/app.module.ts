import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TerminusModule } from "@nestjs/terminus";
import { AppController } from "./app.controller";
import { logger } from "./common/logger.middleware";
import { appConstants } from "./constants";
import { ContactsModule } from "./contacts/contacts.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    TerminusModule,
    ContactsModule,
    UsersModule,
    MongooseModule.forRoot(appConstants.connectionString!),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("*");
  }
}
