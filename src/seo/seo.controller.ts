import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { SeoService } from './seo.service';
import { createSeoDTO } from './dto/create.dt';
import { updateSeoDTO } from './dto/update.dt';

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

    @Put()
    updateSeo(@Body() data: updateSeoDTO) {
        return this.seoService.update(data);
    }
}
