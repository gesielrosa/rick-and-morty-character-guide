import { inject, Pipe, PipeTransform } from '@angular/core';

import { FavoritesService } from '../services/favorites.service';

@Pipe({
  name: 'isFavorite',
  standalone: true,
  pure: false,
})
export class IsFavoritePipe implements PipeTransform {
  private _service = inject(FavoritesService);

  public transform(id: number): boolean {
    return this._service.isFavorite(id);
  }
}
