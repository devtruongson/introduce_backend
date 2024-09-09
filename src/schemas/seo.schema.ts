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

    @Prop()
    tw_title: string;

    @Prop()
    tw_description: string;

    @Prop()
    @Prop({
        required: true,
    })
    url: string;

    @Prop({
        required: true,
    })
    canonical: string;

    @Prop({
        default: 'article',
    })
    type: string;

    @Prop({
        default: '',
    })
    meta_og_title: string;

    @Prop({
        default: '',
    })
    fb_app_id: string;

    @Prop({
        default: 'vi_VN',
    })
    locale: string;

    @Prop({
        default: '',
    })
    meta_og_description: string;

    @Prop({
        required: true,
    })
    image_url: string;

    @Prop({
        required: true,
    })
    sitemap_url: string;

    @Prop({
        required: true,
    })
    manifest_url: string;

    @Prop({
        required: true,
    })
    ltd_json_url: string;

    @Prop({
        required: false,
        default: false,
    })
    is_active: string;
}

export const SeoSchema = SchemaFactory.createForClass(Seo);
