import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CardComponent } from '../../../../ui/card/card.component';
import { PageHeaderComponent } from '../../../../ui/page-header/page-header.component';
import { CharacterCardComponent } from '../../../characters/components/character-card/character-card.component';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardComponent, CharacterCardComponent, FormsModule, NgClass, RouterLink, PageHeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  private _service = inject(FavoritesService);

  public items = this._service.favorites;
}
