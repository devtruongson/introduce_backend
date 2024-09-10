import slugify from 'slugify';

export const generatorSlug = (value: string, isNewDate: boolean = false) => {
    let stringSlug = value;
    if (isNewDate) {
        stringSlug = stringSlug + ' ' + new Date().getTime();
    }

    return slugify(stringSlug, {
        remove: undefined,
        lower: false,
        strict: false,
        locale: 'vi',
        trim: true,
    });
};
