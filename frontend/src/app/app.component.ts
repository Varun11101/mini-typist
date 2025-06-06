import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TypingTestComponent } from './screens/typing-test/typing-test.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingService, LoginService, ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, TypingTestComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mini-typist';


  constructor(private projectService: ProjectService, private router: Router,
      private loginService: LoginService,
      private loading: LoadingService,
    ) {
    this.projectService.applyThemeIfSet();
    // this.router.navigateByUrl("/login")

  }

  isLoading() {
    return this.loading.isLoading();
  }

  ngOnInit() {
    if(!this.loginService.isUserLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
  }

}
