import { Component } from '@angular/core';
import { THEMES } from '../../constants';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [NgFor, FormsModule, NgStyle, NgClass],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css'
})
export class ThemesComponent {

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private login: LoginService,
  ) {}

  allThemes: any = THEMES;

  themeClicked(themeObj: any) {
    document.body.className = `${themeObj.name}-theme`
    this.projectService.setTheme(themeObj.name);
  }

  backClicked() {
    if(this.login.isUserLoggedIn()) {
      this.router.navigateByUrl("");
    } else {
      this.router.navigateByUrl("/login")
    }
  }
}
