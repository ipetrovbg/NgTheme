export interface IUser {
    id: number;
    name?: string;
    news?: string;
    email?: string;
}

export class User implements IUser {
    public id: number;
    public email: string;
    public name: string;
    public news: string;
    protected _user: any;

    constructor( user ) {
      this.id = ( user && user.id ) ? user.id : null;
      this.email = ( user && user.email ) ? user.email : '';
      this.name = ( user && user.name ) ? user.name : '';
      this.news = ( user && user.news ) ? user.news : '';
      this.user = user ? user : {};
    }

    public isAuth() {
        return this.user ? true : false;
    }

    get user(): any {
        return this._user;
    }
    set user(user: any) {
        this._user = user;
    }
}
