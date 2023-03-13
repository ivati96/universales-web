import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'universales';
  menuMobile: boolean = false;

  handlerMenuMobile($event: MouseEvent) {
    this.menuMobile = !this.menuMobile;
  }

  handlercloseMenuMobile($event: MouseEvent) {
    this.menuMobile = false;
  }
}
