import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class LaravelUserServiceService {
  private oauthUrl = 'http://localhost:8000/oauth/token';
  private usersUrl = 'http://localhost:8000/api/user';
  constructor(private http: Http) {}

  getAccessToken() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const postData = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'dIp2X5LGkrCF86RN8mrDXIXXRL2a0Hd1iZamgBSu',
      username: 'ipetrovbg2@gmail.com',
      password: 'Petrov89@',
      scope: ''
    }

    return this.http.post(this.oauthUrl, JSON.stringify(postData), {
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUsers(accessToken: string): Observable<any> {

    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    });

    return this.http.get(this.usersUrl, {headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
