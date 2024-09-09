import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class loginDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
