import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CateService } from './cate.service';
import { createCateDTO } from './dto/create.dt';
import { updateCateDTO } from './dto/update.dt';
import { UpdateFiledCateDTO } from './dto/updateFiledCate.dt';
import { TCateFilter } from 'src/utils/cate.dt';

@Controller('cate')
export class CateController {
    constructor(private readonly cateService: CateService) {}

    @Post()
    createCate(@Body() data: createCateDTO) {
        return this.cateService.createCate(data);
    }

    @Put()
    updateCate(@Body() data: updateCateDTO) {
        return this.cateService.updateCate(data);
    }

    @Patch(':id')
    updateFiledDocument(@Param('id') _id: string, @Body() data: UpdateFiledCateDTO) {
        return this.cateService.updateFiledDocument(_id, data);
    }

    @Get()
    getAllCatePagination(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('filter') filter: TCateFilter,
    ) {
        if (typeof page || typeof pageSize || (filter !== 'active' && filter !== 'all')) {
            throw new BadRequestException('Bạn hãy kiểm tra lại tham số của mình!');
        }
        return this.cateService.getAllCatePagination(page, pageSize, filter);
    }
}
