import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SeoService } from './seo.service';
import { createSeoDTO } from './dto/create.dt';

@Controller('seo')
export class SeoController {
    constructor(private readonly seoService: SeoService) {}

    @Post()
    createSeo(@Body() data: createSeoDTO) {
        return this.seoService.create(data);
    }

    @Get()
    getSeoActive(@Query('isAll') isAll: 'all' | 'active') {
        return this.seoService.getSeoActive(isAll);
    }
}
