import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export type ContactDocument = Contact & Document<Contact>;

@Schema()
export class Contact {
  @ApiProperty({ example: "6356fb55415cd6d75b4063d9" })
  @IsString()
  _id: Types.ObjectId;
  @Prop({
    type: String,
    required: [true, "Set name for contact"],
  })
  @ApiProperty({ example: "John" })
  @IsString()
  name: string;
  @Prop({
    type: String,
  })
  @ApiProperty({ example: "user@gmail.com" })
  @IsEmail()
  email: string;
  @Prop({
    type: String,
  })
  @ApiProperty({ example: "8182487778" })
  @IsString()
  phone: string;
  @Prop({
    type: Boolean,
    default: false,
  })
  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  favorite: boolean;
  @ApiProperty({ example: "6363e9842268e9c90b6e7903" })
  @Prop({ type: Types.ObjectId, ref: "UserEntity" })
  owner: Types.ObjectId;
}

export const ContactSchema = SchemaFactory.createForClass(Contact).set(
  "versionKey",
  false,
);
