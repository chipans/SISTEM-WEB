import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../controls/main-header/main-header.component';
import { NgClass } from '@angular/common';
import { PersonMenu } from '../../models/access-control/person-menu-interface';
import MenuLayoutComponent from '../layout/menu-layout.component';




@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet, HeaderComponent, MenuLayoutComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  isLoading = signal(false);
  menuOpen: boolean = true;

  menuData = signal<PersonMenu[]>([
    // {
    //   title: 'Almacén',
    //   menuAssets: [
    //     { title: 'Consolidación', iconUrl: 'assets/icons/icon-secre.svg', url: '/dashboard/consolidacion' },
    //     { title: 'Reportes', iconUrl: 'assets/icons/icon-secre.svg', url: '/dashboard/reportes' }
    //   ]
    // },
    // {
    //   title: 'Gestión',
    //   menuAssets: [
    //     { title: 'Usuarios', iconUrl: 'assets/icons/icon-secre.svg', url: '/dashboard/usuarios' }
    //   ]
    // }
  ]);

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}