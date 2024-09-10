import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { createCateDTO } from './dto/create.dt';
import { Cate, CateDocument } from 'src/schemas/cate.schema';
import { generatorSlug } from 'src/helpers/slug';
import { updateCateDTO } from './dto/update.dt';
import { UpdateFiledCateDTO } from './dto/updateFiledCate.dt';
import { TCateFilter } from 'src/utils/cate.dt';

@Injectable()
export class CateService {
    constructor(@InjectModel(Cate.name) private readonly cateModel: PaginateModel<CateDocument>) {}

    async createCate(data: createCateDTO) {
        try {
            const cate = new this.cateModel({
                ...data,
                slug: generatorSlug(data.title, true),
            });

            return cate.save();
        } catch (error) {
            throw new HttpException(error.message ? error.message : 'Có lỗi xảy ra', HttpStatus.BAD_REQUEST);
        }
    }

    async updateCate(data: updateCateDTO) {
        try {
            const cate = await this.cateModel.findByIdAndUpdate(
                data._id,
                {
                    ...data,
                    slug: generatorSlug(data.title, true),
                },
                {
                    new: true,
                },
            );

            return cate;
        } catch (error) {
            throw new HttpException(error.message ? error.message : 'Có lỗi xảy ra', HttpStatus.BAD_REQUEST);
        }
    }

    async updateFiledDocument(_id: string, data: UpdateFiledCateDTO) {
        try {
            const record: Record<string, any> =
                data.filed === 'title'
                    ? { [data.filed]: data.value, slug: generatorSlug(String(data.value), true) }
                    : { [data.filed]: data.value };

            const cate = await this.cateModel.findByIdAndUpdate(_id, record, {
                new: true,
            });

            return cate;
        } catch (error) {
            throw new HttpException(error.message ? error.message : 'Có lỗi xảy ra', HttpStatus.BAD_REQUEST);
        }
    }

    async getAllCatePagination(page: number, pageSize: number, filter: TCateFilter) {
        return {
            page,
            pageSize,
            filter,
        };
    }
}
