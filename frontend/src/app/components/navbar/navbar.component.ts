import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private utils: UtilsService,
  ) {}

}
