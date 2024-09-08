import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cate } from './cate.schema';
import { User } from './user.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
    @Prop({
        required: true,
    })
    title: string;

    @Prop({
        required: true,
    })
    content: string; // markdown

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cate',
    })
    cate: Cate;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    author: User;

    @Prop([String])
    tags: string[];

    @Prop([String])
    keywords: string[];

    @Prop({
        required: true,
    })
    meta_description: string;

    @Prop()
    image_url: string;

    @Prop({
        required: true,
        index: true,
    })
    slug: string;

    @Prop({
        default: true,
    })
    is_active: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
