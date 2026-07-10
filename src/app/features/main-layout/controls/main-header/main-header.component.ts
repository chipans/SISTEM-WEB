import { Component, EventEmitter, Output, signal } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './main-header.component.html',
  imports: [SvgIconComponent],
})
export class HeaderComponent {
  isLoading = signal(false);
  isDarkMode: boolean = true;
  

  institution: string = 'Universidad Adventista de Bolivia';
  operation: string = 'Departamento de Almacen - comedor';

  @Output() toggleMenu = new EventEmitter<void>();

  OputMenu() {
    this.toggleMenu.emit()
  }

  toggleDarkMode(){
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', !this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? '' : 'dark')
  }

}