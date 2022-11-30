import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsBoolean, IsOptional } from "class-validator";

export class GetContactsDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  page: number;
  @ApiProperty({ default: 20, required: false })
  @IsNumber()
  @IsOptional()
  limit: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  favorite: boolean;
}
