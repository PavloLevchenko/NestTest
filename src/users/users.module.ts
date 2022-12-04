import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { AuthModule } from "../auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";
import { join } from "path";
import { userConstants } from "./constants";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "./entities/user.entity";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: join(process.cwd(), userConstants.tempFolder),
    }),
    MongooseModule.forFeature([
      { name: userConstants.userCollectionName, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
