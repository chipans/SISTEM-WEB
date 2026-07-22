import { Component, input } from "@angular/core";
import { SistemMainMenuComponent } from "src/app/shared/controls/main-menu/main-menu-component";
import { PersonMenu } from "../../models/access-control/person-menu-interface";

@Component({
  selector: 'Sistem-menu-layout',
  templateUrl: './menu-layout.component.html',
  standalone: true,
  imports: [SistemMainMenuComponent]

})

export default class MenuLayoutComponent {
  menuData = input<PersonMenu[]>([]);
  menuOpen = false;

  toggleMenu() {
      this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
      this.menuOpen = false;
  } 

}