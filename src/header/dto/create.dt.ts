import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ISubmenu } from 'src/utils/header.dt';

export class createHeaderDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    href: string;

    @IsNotEmpty()
    icon: string; // Chỉ có thể là SVG | Tailwind ICON | Bootstrap icon

    submenu: ISubmenu[];

    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;
}
