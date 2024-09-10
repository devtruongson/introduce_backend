import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class updateCateDTO {
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    meta_description: string;

    @IsString()
    url: string;

    @IsString()
    image_url: string;

    @IsBoolean()
    is_active: boolean;
}
