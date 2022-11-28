import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmptyBodyValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    if(value){
        throw new BadRequestException('Body object is empty');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [Object];
    return !types.includes(metatype);
  }
}
