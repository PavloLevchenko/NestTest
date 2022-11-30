import { PickType } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class UpdateUserSubscribtion extends PickType(UserEntity, ['subscription'] as const) {}
