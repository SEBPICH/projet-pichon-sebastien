import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet_pichon_sebastien';

  static goToInscription: boolean;
  constructor(private router: Router, public sharedService: SharedService) {}

}
