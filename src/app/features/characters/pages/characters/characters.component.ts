import { NgClass } from '@angular/common';
import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { debounceTime, finalize } from 'rxjs';

import { setQueryParams } from '../../../../shared/utils/set-query-params';
import { ButtonComponent } from '../../../../ui/button/button.component';
import { CardComponent } from '../../../../ui/card/card.component';
import { FormFieldComponent } from '../../../../ui/form-field/form-field.component';
import { PageHeaderComponent } from '../../../../ui/page-header/page-header.component';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../types/character.type';
import { Pagination } from '../../types/pagination.type';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    PageHeaderComponent,
    FormFieldComponent,
    FormsModule,
    NgClass,
    CharacterCardComponent,
    CardComponent,
    ButtonComponent,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  public search = model('');

  public items = signal<Character[] | undefined>(undefined);

  public pagination = signal<Pagination | undefined>(undefined);

  public currentPage = signal<number>(1);

  public loading = signal<boolean>(false);

  private _activatedRoute = inject(ActivatedRoute);

  private _setQueryParams = setQueryParams();

  private _service = inject(CharactersService);

  public ngOnInit(): void {
    // NOTE: Is not necessary to unsubscribe from this subscription because it will be automatically unsubscribed when the component is destroyed
    this._activatedRoute.queryParams.pipe(debounceTime(500)).subscribe(({ search, page }) => {
      this.search.set(search || '');
      this.currentPage.set(Number(page || 1));

      this._searchCharacters();
    });
  }

  public changeParams(params: Params): void {
    this._setQueryParams.set(params);
  }

  public onSearch(searchTerm: string): void {
    this.items.set(undefined);
    this.pagination.set(undefined);
    this.changeParams({ search: searchTerm, page: 1 });
  }

  public loadMore(): void {
    this.loading.set(true);
    this.changeParams({ page: this.currentPage() + 1 });
  }

  private _searchCharacters(): void {
    this.loading.set(true);

    this._service
      .search({
        name: this.search(),
        page: this.currentPage(),
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => {
          this.items.update((items = []) => [...items, ...response.results]);
          this.pagination.set(response.info);
        },
        error: () => {
          this.items.set([]);
          this.pagination.set(undefined);
        },
      });
  }
}
