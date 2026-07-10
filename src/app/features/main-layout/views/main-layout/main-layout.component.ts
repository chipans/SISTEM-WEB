import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../../controls/main-header/main-header.component';
import { SystemFeature } from '../../models/system-feature/system-feature.model';
import { NgClass } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';




@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, SvgIconComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  isLoading = signal(false);
  menuOpen: boolean = true;

  // features: SystemFeature[] = [
  //   { title: 'Dashboard', iconUrl: 'assets/icons/icon-home.svg', url: '/dashboard' },
  //   { title: 'Consolidar', iconUrl: 'assets/icons/icon-home.svg', url: 'consolidar '},
  //   { title: 'Gestion $', iconUrl: 'assets/icons/icon-home.svg', url: 'gestion' },
  //   { title: 'Ajustes', iconUrl: 'assets/icons/icon-home.svg', url: 'ajustes' },
  //   { title: 'Usuario', iconUrl: 'assets/icons/icon-home.svg', url: 'usuario'},
  // ];

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}