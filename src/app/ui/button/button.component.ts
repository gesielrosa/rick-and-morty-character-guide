import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[app-button]',
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {}
