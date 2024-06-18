import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./favorites/favorites.component').then(m => m.FavoritesComponent),
  },
];
