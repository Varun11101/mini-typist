import { Component } from '@angular/core';
import { InputBoxComponent } from '../input-box/input-box.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputBoxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mode: string = 'login'; // modes can be register/login

  isLogin() {
    return this.mode === 'login';
  }

  submitClicked() {

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
