import { PickType } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class VerifyUserEmailDto extends PickType(UserEntity, ['email'] as const) {}