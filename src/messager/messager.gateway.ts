import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MessagerService } from './messager.service';
import { CreateMessagerDto } from './dto/create-messager.dto';
import { UpdateMessagerDto } from './dto/update-messager.dto';

@WebSocketGateway()
export class MessagerGateway {
  constructor(private readonly messagerService: MessagerService) {}

  @SubscribeMessage('createMessager')
  create(@MessageBody() createMessagerDto: CreateMessagerDto) {
    return this.messagerService.create(createMessagerDto);
  }

  @SubscribeMessage('findAllMessager')
  findAll() {
    return this.messagerService.findAll();
  }

  @SubscribeMessage('findOneMessager')
  findOne(@MessageBody() id: number) {
    return this.messagerService.findOne(id);
  }

  @SubscribeMessage('updateMessager')
  update(@MessageBody() updateMessagerDto: UpdateMessagerDto) {
    return this.messagerService.update(updateMessagerDto.id, updateMessagerDto);
  }

  @SubscribeMessage('removeMessager')
  remove(@MessageBody() id: number) {
    return this.messagerService.remove(id);
  }
}
