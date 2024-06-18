import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrl: './card.component.scss',
})
export class CardComponent {}
