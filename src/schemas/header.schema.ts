import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HeaderDocument = HydratedDocument<Header>;

@Schema({ _id: true })
class Submenu {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    foundation: string;

    @Prop({ required: true })
    url: string;

    @Prop({ default: true })
    is_active: boolean;
}

@Schema({ timestamps: true })
export class Header {
    @Prop({
        required: true,
    })
    title: string;

    @Prop({
        required: true,
    })
    href: string;

    @Prop({
        required: true,
    })
    icon: string;

    @Prop({
        type: [Submenu],
        default: [],
    })
    submenu: Submenu[];
}

export const HeaderSchema = SchemaFactory.createForClass(Header);
