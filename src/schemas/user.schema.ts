import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: true })
class Token {
    @Prop({ required: true })
    access_token: string;

    @Prop({ required: true })
    refresh_token: string;
}

@Schema({ _id: true })
class Social {
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
export class User {
    @Prop({
        required: true,
        maxlength: 80,
        minlength: 1,
    })
    full_name: string;

    @Prop({
        default: false,
    })
    is_admin: boolean;

    @Prop({
        default: false,
    })
    is_blocked: boolean;

    @Prop({
        required: true,
        minlength: 10,
        maxlength: 80,
        index: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({ type: [Token], default: [] })
    tokens: Token[];

    @Prop({ type: [Social], default: [] })
    socials: Social[];
}

export const UserSchema = SchemaFactory.createForClass(User);
