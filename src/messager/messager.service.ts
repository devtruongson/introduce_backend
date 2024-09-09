import { Injectable } from '@nestjs/common';
import { CreateMessagerDto } from './dto/create-messager.dto';
import { UpdateMessagerDto } from './dto/update-messager.dto';

@Injectable()
export class MessagerService {
  create(createMessagerDto: CreateMessagerDto) {
    return 'This action adds a new messager';
  }

  findAll() {
    return `This action returns all messager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messager`;
  }

  update(id: number, updateMessagerDto: UpdateMessagerDto) {
    return `This action updates a #${id} messager`;
  }

  remove(id: number) {
    return `This action removes a #${id} messager`;
  }
}
