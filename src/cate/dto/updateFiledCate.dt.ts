import { IsNotEmpty, IsString, IsIn, Validate } from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { TCate } from 'src/utils/cate.dt';

export const TCateValues: TCate[] = ['title', 'description', 'meta_description', 'url', 'image_url', 'is_active'];

@ValidatorConstraint({ name: 'CheckValueBasedOnField', async: false })
export class CheckValueBasedOnField implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const filed: TCate = (args.object as any).filed;

        if (filed === 'is_active') {
            return typeof value === 'boolean';
        }

        return typeof value === 'string';
    }

    defaultMessage(args: ValidationArguments) {
        const filed: TCate = (args.object as any).filed;
        if (filed === 'is_active') {
            return `Khi bạn sử dụng filed là is_active thì kiểu dữ liệu của value phải là boolean`;
        }
        return `Kiểu dữ liệu boolean không hợp lệ, kiểu dữ liệu hợp lệ là string`;
    }
}

export class UpdateFiledCateDTO {
    @IsNotEmpty()
    @IsString()
    @IsIn(TCateValues)
    filed: TCate;

    @IsNotEmpty()
    @Validate(CheckValueBasedOnField)
    value: boolean | string;
}
