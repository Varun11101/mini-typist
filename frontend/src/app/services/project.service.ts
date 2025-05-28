import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

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
}
