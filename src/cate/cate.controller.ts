import { Body, Controller, Post } from '@nestjs/common';
import { CateService } from './cate.service';
import { createCateDTO } from './dto/create.dt';

@Controller('cate')
export class CateController {
    constructor(private readonly cateService: CateService) {}

    @Post()
    createCate(@Body() data: createCateDTO) {
        return this.cateService.createCate(data);
    }
}
