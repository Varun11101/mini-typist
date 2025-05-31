import { Routes } from '@angular/router';
import { TypingTestComponent } from './screens/typing-test/typing-test.component';
import { ThemesComponent } from './components/themes/themes.component';
import { LoginComponent } from  './components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: TypingTestComponent
    },
    {
        path: 'themes',
        component: ThemesComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
]
;
