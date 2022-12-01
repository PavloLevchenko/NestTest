import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { logger } from "./common/logger.middleware";
import { appConstants } from "./constants";
import { ContactsModule } from "./contacts/contacts.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ContactsModule,
    UsersModule,
    MongooseModule.forRoot(appConstants.connectionString!),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("*");
  }
}
