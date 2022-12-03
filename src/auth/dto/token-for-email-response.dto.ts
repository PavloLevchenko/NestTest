import { ApiProperty } from "@nestjs/swagger";
import { authConstants } from "../constants";

export class TokenForEmailResponseDto {
  @ApiProperty({ example: authConstants.sendVerificationEmailMessage })
  message: string;
}
