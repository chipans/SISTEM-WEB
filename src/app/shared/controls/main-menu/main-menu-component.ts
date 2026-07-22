import { Component, input, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { RouterLink, RouterLinkActive, ɵEmptyOutletComponent } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonMenu } from 'src/app/features/main-layout/models/access-control/person-menu-interface';


@Component({
  selector: 'sistem-main-menu',
  templateUrl: './main-menu-component.html',
  standalone: true,
  imports: [SvgIconComponent, RouterLink, RouterLinkActive, CommonModule, ɵEmptyOutletComponent]
})
export class SistemMainMenuComponent {
  @Input() MenuTitle = '';
  @Input() MenuIcon =  '';
  @Input() MenuDescription = '';
  MenuData = input<PersonMenu[]>();
  @Input() routeHome : string = '';

  isCollapsed = false;
  isMobileCollapsed = false;

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileMenu() {
    this.isMobileCollapsed = !this.isMobileCollapsed;
  }
}
