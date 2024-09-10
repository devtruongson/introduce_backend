import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CateDocument = HydratedDocument<Cate>;

@Schema({ timestamps: true })
export class Cate {
    @Prop({
        required: true,
    })
    title: string;

    @Prop({
        required: true,
    })
    description: string; // markdown

    @Prop({
        required: true,
    })
    meta_description: string;

    @Prop({
        required: true,
    })
    url: string;

    @Prop({
        required: true,
    })
    image_url: string;

    @Prop({
        required: true,
        index: true,
        unique: true,
    })
    slug: string;

    @Prop({
        default: true,
    })
    is_active: boolean;
}

export const CateSchema = SchemaFactory.createForClass(Cate);
