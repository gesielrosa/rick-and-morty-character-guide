import { Component, inject, input } from '@angular/core';

import { CardComponent } from '../../../../ui/card/card.component';
import { IsFavoritePipe } from '../../../favorites/pipes/is-favorite.pipe';
import { FavoritesService } from '../../../favorites/services/favorites.service';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CardComponent, IsFavoritePipe],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  public id = input.required<number>();

  public name = input.required<string>();

  public image = input.required<string>();

  public species = input.required<string>();

  private _favoritesService = inject(FavoritesService);

  public toggleFavorite(): void {
    this._favoritesService.toggle(this.id());
  }
}
