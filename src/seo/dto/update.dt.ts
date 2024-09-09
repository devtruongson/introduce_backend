import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class updateSeoDTO {
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    meta_title: string;

    @IsNotEmpty()
    meta_description: string;

    @IsNotEmpty()
    meta_roboto: string;

    @IsNotEmpty()
    google_bot: string;

    @IsNotEmpty()
    site_link: string;

    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    image_url: string;

    @IsNotEmpty()
    @IsBoolean()
    is_active: string;

    @IsNotEmpty()
    canonical: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    @IsString()
    meta_og_title: string;

    @IsNotEmpty()
    @IsString()
    fb_app_id: string;

    @IsNotEmpty()
    locale: string;

    @IsNotEmpty()
    meta_og_description: string;

    @IsNotEmpty()
    tw_title: string;

    @IsNotEmpty()
    tw_description: string;

    @IsNotEmpty()
    ltd_json_url: string;

    @IsNotEmpty()
    manifest_url: string;

    @IsNotEmpty()
    sitemap_url: string;
}
