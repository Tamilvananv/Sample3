import { isNullOrUndefined, isNull } from 'util';

export class User {

    private userId: number;
    private userName: string;

    private role: string;

    public isUserInfoSaved: boolean;

    private accessToken: string;
    private refreshToken: string;
    private expiryTime: string;
    access_token

    constructor(accessToken: string, tokenType: string, refreshToken: string, expiryTime: string,
        scope: string, userId: number, firstName: string, lastName: string, roleId: string, supplierId: string, jti: string
        , userName: string, role: string
    ) {

        if (isNullOrUndefined(userId) || isNaN(userId)) {
            throw new Error("User ID need to be number");
        }

        this.userId = userId;
        this.userName = userName;

        this.role = role;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiryTime = expiryTime;
    }

    public getUserId() {
        return this.userId;
    }

    public getUsername() {
        return this.userName;
    }

    public getUserRole() {
        return this.role;
    }

    public getLoginToken() {
        return this.accessToken;
    }
    public getRefreshToken() {
        return this.accessToken;
    }
    public getExpiryTime() {
        return this.accessToken;
    }
}