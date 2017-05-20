export interface IUser {
    uid: string;
    displayName?: string;
    photoURL?: string;
    email: string;
}

export class User implements IUser {
    public uid: string;
    public displayName: string;
    public photoURL?: string;
    public email: string;
    protected _user: any;

    constructor( user ) {
        if ( user && user.uid ) {
            this.user = user;
            this.uid = this.user.uid;
            this.email = this.user.email;
            this.displayName = this.user.displayName;
            if ( this.user.photoURL ) {
              this.photoURL = this.user.photoURL;
            }
        }
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