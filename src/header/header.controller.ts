import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { HeaderService } from './header.service';
import { createHeaderDTO } from './dto/create.dt';
import { IFilterRequestPosition } from 'src/utils/header.dt';
import { oneUpdateHeaderDTO } from './dto/oneupdate.dt';
import { positionUpdateHeaderDTO } from './dto/positionupdate.dt';

@Controller('header')
export class HeaderController {
    constructor(private readonly headerService: HeaderService) {}

    @Post()
    createHeader(@Body() data: createHeaderDTO) {
        return this.headerService.createHeader(data);
    }

    @Get()
    getHeaderForPosition(@Query() query: IFilterRequestPosition) {
        return this.headerService.getHeaderForPosition(query);
    }

    @Put('one')
    updateOneHeader(@Body() data: oneUpdateHeaderDTO) {
        return this.headerService.updateOneHeader(data);
    }

    @Put('position')
    updatePosition(@Body() data: positionUpdateHeaderDTO) {
        return this.headerService.updatePosition(data);
    }
}
