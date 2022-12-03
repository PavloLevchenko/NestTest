import { ApiProperty } from "@nestjs/swagger";
import { authConstants } from "../constants";

export class ConfirmEmailResponseDto {
  @ApiProperty({ example: authConstants.confirmEmailMessage })
  message: string;
}
