import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static USER_INFO = "USER_INFO";

  private userInfoSubject: BehaviorSubject<UserModel | null>;
  public currentUser$: Observable<UserModel | null>;

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) {

    const jsonString = this.cookieService.get(AuthenticationService.USER_INFO);
    if (jsonString === '') {
      this.userInfoSubject = new BehaviorSubject<UserModel | null>(null);
    } else {
      this.userInfoSubject = new BehaviorSubject<UserModel | null>(JSON.parse(this.cookieService.get(AuthenticationService.USER_INFO)));
    }
    this.currentUser$ = this.userInfoSubject.asObservable();
  }

  login(username: string, password: string): Observable<UserModel> {

    const url = `${environment.ENDPOINTS.USER_LOGIN}`;

    return this.httpClient.post<UserModel>(url, { username, password })
      .pipe(
        map(userModel => {

          // create a cookie with jwt token
          this.cookieService.set(AuthenticationService.USER_INFO, JSON.stringify(userModel));

          // notify everybody else 
          this.userInfoSubject.next(userModel);

          return userModel;
        })
      );
  }

  logout() {
    // TODO logout logic 
    this.cookieService.delete(AuthenticationService.USER_INFO);

    this.userInfoSubject.next(null);
  }

  registerUser(formValue: any): Observable<UserModel> {

    // const url = "https://demo1804527.mockable.io/register";
    const url = `${environment.ENDPOINTS.USER_CREATION}`;

    return this.httpClient.post<UserModel>(
      url,
      formValue
    ).pipe(
      map(userModel => {
        // create a cookie with jwt token
        this.cookieService.set(AuthenticationService.USER_INFO, JSON.stringify(userModel));

        // notify everybody else 
        this.userInfoSubject.next(userModel);

        return userModel;
      })
    );
  }

  fetchUserInfo(userId: string): Observable<UserModel> {
    const url = `${environment.ENDPOINTS.USER_INFO}/${userId}`;
    return this.httpClient.get<UserModel>(url);
  }

  public get currentUserValue() {
    return this.userInfoSubject.value;
  }
}