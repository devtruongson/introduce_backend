import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createHeaderDTO } from './dto/create.dt';
import { InjectModel } from '@nestjs/mongoose';
import { Header, HeaderDocument } from 'src/schemas/header.schema';
import { Model } from 'mongoose';
import { IFilterRequestPosition } from 'src/utils/header.dt';
import { oneUpdateHeaderDTO } from './dto/oneupdate.dt';
import { data, positionUpdateHeaderDTO } from './dto/positionupdate.dt';

@Injectable()
export class HeaderService {
    constructor(@InjectModel(Header.name) private readonly headerModel: Model<HeaderDocument>) {}

    async createHeader(data: createHeaderDTO) {
        try {
            const positionMax = await this.headerModel.findOne().sort({ position: -1 }).limit(1).select(['position']);

            if (!positionMax) {
                const header = new this.headerModel({
                    ...data,
                });
                await header.save();
                return header;
            } else {
                const header = new this.headerModel({
                    ...data,
                    position: positionMax.position + 1,
                });
                await header.save();
                return header;
            }
            if (data.is_active) {
                // Revalidate NEXT JS Call
            }
        } catch (error) {
            throw new HttpException(error.message ? error.message : 'Có lỗi xảy ra', HttpStatus.BAD_REQUEST);
        }
    }

    async getHeaderForPosition(query: IFilterRequestPosition) {
        try {
            if (!query.filter) {
                throw new Error('Filter không được để trống chỉ nó nhận giá trị all or position');
            }

            switch (query.filter) {
                case 'all': {
                    if (query.data === 'all') {
                        return await this.headerModel.find();
                    } else {
                        return await this.headerModel.find({
                            is_active: true,
                        });
                    }
                }
                case 'position': {
                    if (query.data === 'all') {
                        return await this.headerModel.find().sort({ position: 1 });
                    } else {
                        return await this.headerModel.aggregate([
                            {
                                $match: {
                                    is_active: true,
                                    'submenu.is_active': true,
                                },
                            },
                            {
                                $addFields: {
                                    submenu: {
                                        $filter: {
                                            input: '$submenu',
                                            as: 'item',
                                            cond: { $eq: ['$$item.is_active', true] },
                                        },
                                    },
                                },
                            },
                            {
                                $sort: { position: 1 },
                            },
                        ]);
                    }
                }

                case 'one_select': {
                    if (query.data === 'all') {
                        return await this.headerModel
                            .find()
                            .sort({ position: 1 })
                            .select(query.select ? query.select.split('-') : ['_id', 'title', 'position']);
                    } else {
                        return await this.headerModel
                            .find({
                                is_active: true,
                            })
                            .sort({ position: 1 })
                            .select(query.select ? query.select.split('-') : ['_id', 'title', 'position']);
                    }
                }
            }
        } catch (error) {
            throw new HttpException(error.message ? error.message : 'Có lỗi xảy ra', HttpStatus.BAD_REQUEST);
        }
    }

    async updateOneHeader(data: oneUpdateHeaderDTO) {
        try {
            await this.headerModel.updateOne(
                {
                    _id: data._id,
                },
                {
                    ...data,
                },
            );

            return {
                msg: 'Cập nhật thành công header!',
            };
        } catch (error) {
            throw new HttpException(error.message ? error.message : 'Có lỗi xảy ra', HttpStatus.BAD_REQUEST);
        }
    }

    async updatePosition(data: positionUpdateHeaderDTO) {
        try {
            const bulkOps = data.data.map((item) => ({
                updateOne: {
                    filter: { _id: item._id }, // Tạo filter với _id
                    update: { $set: { position: item.position } }, // Thực hiện cập nhật
                    upsert: false, // Không tạo bản ghi mới nếu không tìm thấy bản ghi nào
                },
            }));

            return await this.headerModel.bulkWrite(bulkOps);
        } catch (error) {
            throw new HttpException(error.message ? error.message : 'Có lỗi xảy ra', HttpStatus.BAD_REQUEST);
        }
    }
}
