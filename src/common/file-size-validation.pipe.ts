import { ParseFilePipe, MaxFileSizeValidator } from "@nestjs/common";

export const FileSizeValidationPipe = (fileSize: number = 1) => {
  return new ParseFilePipe({
    validators: [new MaxFileSizeValidator({ maxSize: 1000000*fileSize })],
  });
};
