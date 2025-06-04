import { Component } from '@angular/core';
import { InputBoxComponent } from '../input-box/input-box.component';
import { LoadingService, LoggerService, LoginService, ProjectService } from '../../services/project.service';
import { endpoints } from '../../endpoints';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputBoxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private log: LoggerService,
    private login: LoginService,
    private loading: LoadingService,
    private projectService: ProjectService,
    private router: Router
  ) {}
  mode: string = 'login'; // modes can be register/login
  username: string = '';
  password: string = '';

  dataChanged(data: string, type: string) {
    if(type === 'password') {
      this.password = data;
    } else {
      this.username = data;
    }
  } 

  isLogin() {
    return this.mode === 'login';
  }

  submitClicked() {
    if(this.isLogin()) this.loginUser();
    else this.registerUser();
  }

  setLoginUser(res: any) {
    this.login.setAccessToken(res?.access);
    this.login.setRefreshToken(res?.refresh);
    this.login.setUsername(res?.username);
    this.login.setUserId(res?.user_id);
  }

  loginUser() {
    try {
      this.loading.setLoader(true);
      const payload: any = {
        username: this.username,
        password: this.password
      }
      const url: string = endpoints.login;
      const headers: any = this.projectService.getHeaders();
      this.projectService.postData(url, payload, headers).subscribe({
        next: (res: any) => {
          this.setLoginUser(res);
          this.router.navigateByUrl('');
        },
        error: (err: any) => {
          this.log.logUtil(err);
        }
      })
    } catch(err) {
      this.log.logUtil(err);
    } finally {
      this.loading.setLoader(false);
    }
  }

  setRegisterUser(res: any) {
    this.resetForm();
    this.mode = 'login';
  }

  resetForm() {
    this.username = '';
    this.password = '';
  }

  registerUser() {
    try {
      this.loading.setLoader(true);
      const payload: any = {
        username: this.username,
        password: this.password
      }
      const url: string = endpoints.signup;
      const headers: any = this.projectService.getHeaders();
      this.projectService.postData(url, payload, headers).subscribe({
        next: (res: any) => {
          this.log.customSuccessLogger("Registered successfully. Now please login!");
          this.setRegisterUser(res);
        },
        error: (err: any) => {
          this.log.logUtil(err);
        }
      })
    } catch(err) {
      this.log.logUtil(err);
    } finally {
      this.loading.setLoader(false);
    }
  }

  getSwitchMainText() {
    if(this.isLogin()) {
      return "Don't have an account yet?";
    } else {
      return "Already have an account?";
    }
  }

  getSwitchSecondaryText() {
    if(this.isLogin()) {
      return "Register";
    } else {
      return "Login";
    }
  }

  switchMode() {
    if(this.isLogin()) {
      this.mode = 'register';
    } else {
      this.mode = 'login';
    }
  }
}
