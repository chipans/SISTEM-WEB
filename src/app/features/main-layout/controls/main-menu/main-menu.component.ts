import { Component } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { SvgIconComponent } from 'angular-svg-icon';
import { Feature } from '../../models/features';

@Component({
  selector: 'main-menu',
  standalone: true,
  imports: [ HttpClientModule, SvgIconComponent],
  templateUrl: './main-menu.component.html',

})
export class MainMenuComponent {

  public features: Feature[]=[
    {
      name: 'Inicio',
      icon: '/assets/icons/icon-home.svg',
      route: 'dashboard'
    },
    {
      name: 'Auth',
      icon: '/assets/icons/icon-key.svg',
      route: 'dashboard'
    },
    {
      name: 'Configuraciones',
      icon: '/assets/icons/icon-config.svg',
      route: '/settings'
    },
    {
      name: 'Secretaria General',
      icon: '/assets/icons/icon-secre.svg',
      route: '/general-secretary'

    },
    {
      name: 'Recursos Humanos',
      icon: '/assets/icons/icon-rh.svg',
      route: 'human-resources'
    },
    {
      name: 'Academico',
      icon: '/assets/icons/icon-academico.svg',
      route: '/academic'
    },
    {
      name: 'Financiero',
      icon: '/assets/icons/icon-financiero.svg',
      route: '/financial'
    },
    {
      name: 'Restaurante',
      icon: '/assets/icons/icon-comedor.svg',
      route: '/restaurant'
    },
    {
      name: 'UAB-Class',
      icon: '/assets/icons/icon-uabClass.svg',
      route: '/portal'
    },
    {
      name: 'Almacenes',
      icon: '/assets/icons/icon-almacenes.svg',
      route: '/warehouse'
    },
    {
      name: 'Acreditación',
      icon: '/assets/icons/icon-acreditacion.svg',
      route: '/accreditation'
    },
    {
      name: 'Pagina Web',
      icon: '/assets/icons/icon-web.svg',
      route: '/web'
    },
    {
      name: 'Solicitudes internas',
      icon: '/assets/icons/icon-solicitudes.svg',
      route: '/requests'
    },
    {
      name: 'CRM',
      icon: '/assets/icons/icon-crm.svg',
      route: '/crm'
    },
    {
      name: 'Gestion de calidad',
      icon: '/assets/icons/icon-quality.svg',
      route: '/sgc'
    },
    {
      name: 'Hospedaje',
      icon: '/assets/icons/icon-classroom-type.svg',
      route: '/crm'
    },
    
    
  ]
}
