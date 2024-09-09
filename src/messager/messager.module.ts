import { Module } from '@nestjs/common';
import { MessagerService } from './messager.service';
import { MessagerGateway } from './messager.gateway';

@Module({
  providers: [MessagerGateway, MessagerService],
})
export class MessagerModule {}
