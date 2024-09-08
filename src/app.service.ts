import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      id: 1,
      name: 'truong son',
      pro: 'vercel',
    };
  }
}
