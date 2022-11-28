import { Module, NestModule, MiddlewareConsumer, Global } from "@nestjs/common";
import { logger } from "./common/logger.middleware";
import { ContactsModule } from "./contacts/contacts.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ContactsModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes("*");
  }
}
