import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SeoDocument = HydratedDocument<Seo>;

@Schema({ timestamps: true })
export class Seo {
    @Prop({
        required: true,
    })
    title: string;

    @Prop({
        required: true,
    })
    meta_title: string;

    @Prop({
        required: true,
    })
    meta_description: string;

    @Prop({
        required: true,
    })
    meta_roboto: string;

    @Prop({
        required: true,
    })
    google_bot: string;

    @Prop({
        required: true,
    })
    site_link: string;

    @Prop({
        required: true,
    })
    url: string;

    @Prop({
        required: true,
    })
    image_url: string;
}

export const SeoSchema = SchemaFactory.createForClass(Seo);
