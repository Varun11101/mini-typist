import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private login: LoginService
  ) { }

  private hasCurrentTestEnded: boolean = false;

  getTestEndedStatus() {
    return this.hasCurrentTestEnded;
  }

  setTestEndedStatus(status: boolean) {
    this.hasCurrentTestEnded = status;
  }

  setTheme(themeName: string) {
    localStorage.setItem('activeTheme', themeName);
  }

  applyThemeIfSet() {
    const activeTheme: any = localStorage.getItem('activeTheme');
    if(activeTheme) {
      document.body.className = `${activeTheme}-theme`
    }
  }

  getData(url: string, headers?: any) {
    return this.http.get(url, { headers });
  }

  postData(url: string, formData: any, headers?: any) {
    return this.http.post(url, formData, {headers});
  }

  putData(url: string, formData: any, headers?: any) {
    return this.http.put(url, formData, {headers});
  }

  getHeaders(withAuth: boolean = true) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.login.getAccessToken(),
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private router: Router) {}

  setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }
  
  getAccessToken() {
    return 'Bearer ' + localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isUserLoggedIn() {
    const userId: any = localStorage.getItem('userId');
    return !(userId === null);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  setUserId(userId: any) {
    localStorage.setItem('userId', userId);
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  setUsername(username: string) {
    localStorage.setItem('username', username);
  }

  logout() {
    this.clearLocalStorage();
    this.router.navigateByUrl('/login');
  }

  clearLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(
    private loginService: LoginService,
    private msgService: NzMessageService
  ) {}
  defaultDuration: number = 5000;

  public logUtil(data: any, duration: number = this.defaultDuration) {
    this.msgService.error(JSON.stringify(data.error.detail), {
      nzDuration: duration,
      nzPauseOnHover: true
    })
    if(data.status === 401) {
      this.loginService.logout();
    }
  }

  public customErrorLogger(errorMessage: string, duration: number = this.defaultDuration) {
    this.msgService.error(errorMessage, {
      nzDuration: duration
    })
  }

  public customSuccessLogger(successMessage: string, duration: number = this.defaultDuration) {
    this.msgService.success(successMessage, {
      nzDuration: duration
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading = false;

  isLoading() {
    return this.loading;
  }

  setLoader(value: boolean) {
    this.loading = value;
  }
}
