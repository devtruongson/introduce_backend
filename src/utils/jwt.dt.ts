export interface IJwtPayload {
    _id: string;
    is_admin: boolean;
    is_blocked: boolean;
    email: string;
}

export interface IRefreshToken {
    access_token: string;
    refresh_token: string;
    _id: string;
    user_payload: IJwtPayload;
}
