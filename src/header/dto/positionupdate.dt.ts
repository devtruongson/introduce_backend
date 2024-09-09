import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class data {
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNumber()
    position: number;
}

export class positionUpdateHeaderDTO {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => data)
    data: data[];
}
