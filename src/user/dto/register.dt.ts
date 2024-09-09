import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
import { ISocial } from 'src/utils/user.dt';

export class registerDTO {
    @IsNotEmpty()
    full_name: string;

    @IsBoolean()
    is_admin: boolean;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    socials: ISocial;
}
