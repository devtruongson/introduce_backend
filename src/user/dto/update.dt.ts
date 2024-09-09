import { IsNotEmpty } from 'class-validator';
import { IJwtPayload } from 'src/utils/jwt.dt';
import { ISocial } from 'src/utils/user.dt';

export class updateAdminDto {
    @IsNotEmpty()
    full_name: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    description: string; // SEO

    @IsNotEmpty()
    avatar_url: string;

    socials: ISocial;

    user_payload: IJwtPayload;
}
