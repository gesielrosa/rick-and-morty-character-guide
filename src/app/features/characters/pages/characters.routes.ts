import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./characters/characters.component').then(m => m.CharactersComponent),
  },
];
