export interface IHeader {
    title: string;
    href: string;
    icon: string;
    submenu: ISubmenu;
    is_active: boolean;
}

export interface ISubmenu {
    title: string;
    url: string;
    is_active: boolean;
}

export interface IFilterRequestPosition {
    filter: 'all' | 'position' | 'one_select';
    data: 'all' | 'active';
    select?: string;
}

export interface IUpdatePositionHeaderRequest {
    _id: string;
    position: number;
}
