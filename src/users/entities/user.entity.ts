import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";
import { subscriptionEnum } from "../constants";
import { hashPassword } from "src/common/helpers";

export type UserDocument = UserEntity & Document<UserEntity>;

@Schema()
export class UserEntity {
  @IsString()
  _id: string;
  @Prop({
    type: String,
    required: [true, "Email is required"],
    index: true,
    unique: true,
  })
  @ApiProperty({ example: "user@gmail.com" })
  @IsEmail()
  email: string;
  @Prop({
    type: String,
    required: [true, "Password is required"],
  })
  @ApiProperty({ example: "Pas123" })
  @IsString()
  @MinLength(6)
  password: string;
  @Prop({
    type: String,
    enum: subscriptionEnum,
    default: subscriptionEnum[0],
  })
  @ApiProperty({ enum: subscriptionEnum })
  @IsString()
  subscription: string;
  @Prop({
    type: String,
    default: null,
  })
  @IsString()
  token: string;
  @Prop({ type: String, index: true, unique: true })
  @IsString()
  verificationToken: string;
  @Prop({
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  verify: boolean;
  @Prop({ type: String })
  @IsString()
  avatarURL: string;
  @ApiHideProperty()
  validPassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity).set(
  "versionKey",
  false,
);

UserSchema.pre("save", async function save(next) {
  try {
    this.password = await hashPassword(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});
