import { PickType } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";

export class UserDto extends PickType(UserEntity, [
    "email",
    "subscription",
  ] as const) {}
  