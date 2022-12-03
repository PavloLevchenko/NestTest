import { PickType } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class UpdatedUserAvatar extends PickType(UserEntity, ['avatarURL'] as const) {}
