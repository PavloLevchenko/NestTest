import { PickType } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class UpdateUserAvatar extends PickType(UserEntity, ['avatarURL'] as const) {}
