import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/characters/pages/characters.routes').then(m => m.ROUTES),
  },
  {
    path: 'favorites',
    loadChildren: () => import('./features/favorites/pages/favorites.routes').then(m => m.ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
