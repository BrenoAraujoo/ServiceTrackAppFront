export interface LoginModel{
    email: string,
    password: string
}

export class RefreshAccessTokenModel {
    accessToken: string;
    refreshToken: string;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
