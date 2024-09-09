import { BadRequestException, Injectable } from '@nestjs/common';
import { createSeoDTO } from './dto/create.dt';
import { Seo, SeoDocument } from 'src/schemas/seo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeoService {
    constructor(@InjectModel(Seo.name) private seoModel: Model<SeoDocument>) {}

    async create(data: createSeoDTO) {
        if (data.is_active) {
            await this.seoModel.updateMany(
                {
                    is_active: true,
                },
                {
                    is_active: false,
                },
            );
        }
        try {
            const seo = new this.seoModel({
                ...data,
            });

            if (data.is_active) {
                // revalidate tag for NEXT_JS
            }

            await seo.save();
            return seo;
        } catch (error) {
            throw new BadRequestException(`Có lỗi xảy ra ${error}`);
        }
    }

    async getSeoActive(isAll: 'all' | 'active') {
        switch (isAll) {
            case 'all': {
                return await this.seoModel.find();
            }
            default:
                return await this.seoModel.findOne({
                    is_active: true,
                });
        }
    }
}
