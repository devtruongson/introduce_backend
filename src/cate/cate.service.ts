import { Injectable } from '@nestjs/common';
import { createCateDTO } from './dto/create.dt';
import { Cate, CateDocument } from 'src/schemas/cate.schema';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CateService {
    constructor(@InjectModel(Cate.name) private readonly cateModel: PaginateModel<CateDocument>) {}

    async createCate(data: createCateDTO) {
        try {
        } catch (error) {
            // pedding 23:27p: 9/09
        }
    }
}
