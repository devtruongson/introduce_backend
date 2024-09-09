import { PartialType } from '@nestjs/mapped-types';
import { CreateMessagerDto } from './create-messager.dto';

export class UpdateMessagerDto extends PartialType(CreateMessagerDto) {
  id: number;
}
