import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  title = 'projet_pichon_sebastien';
  login: string = '';
  password: string = '';

  lastname: string = '';
  firstname: string = '';
  cnx: boolean = false;
  loginError: boolean = false; 
  produits$: Observable<Array<Product>>;
  static goToInscription: boolean;
  constructor(private apiService: ApiService, private router: Router, public sharedService: SharedService) {
    this.produits$ = this.apiService.getCatalogue();
  }

  inscription() {
    this.sharedService.setGoToInscription(true);
    this.router.navigate(['/inscription']);
  }

  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe((c) => {
      this.lastname = c.lastname;
      this.firstname = c.firstname;
      this.cnx = true;
      this.loginError = false; 
      this.router.navigate(['/products']);
      this.sharedService.setAuthenticated(true);
      localStorage.setItem('accessToken', this.sharedService._accessToken);
      },
      (error) => {
        this.loginError = true; 
        console.error('Error during login:', error);
      }
    );
  }
}
