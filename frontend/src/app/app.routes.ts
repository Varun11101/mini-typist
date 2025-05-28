import { Routes } from '@angular/router';
import { TypingTestComponent } from './screens/typing-test/typing-test.component';
import { ThemesComponent } from './components/themes/themes.component';

export const routes: Routes = [
    {
        path: '',
        component: TypingTestComponent
    },
    {
        path: 'themes',
        component: ThemesComponent
    }
]
;
