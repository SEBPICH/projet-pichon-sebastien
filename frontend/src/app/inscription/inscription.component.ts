import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  connection!: FormGroup;
  cnx: boolean = false;
  loginError: boolean = false; 
  enableMessage: boolean = false; 
  constructor(private router: Router, private sharedService: SharedService, private apiService: ApiService, private fb: FormBuilder) {
    this.createForm();
  }

  retourAccueil(): void {
    this.sharedService.setGoToInscription(false);
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    console.log('Submit button clicked');
    console.log('Submitting form:', this.connection.value);
    if (this.connection.valid) {
      const userData = this.connection.value;
      console.log('Submitting user data:', userData);
      

      this.apiService.createAccount(userData).subscribe(
        (response) => {
          console.log('Account created successfully:', response);
        },
        (error) => {
          console.error('Error creating account:', error);
        }
      );
      this.enableMessage = true;
      setTimeout(() => {
        this.retourAccueil();
      }, 3000);
    }
  }

  createForm() {
    this.connection = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      adresse: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]],
      codepostal: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      ville: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]],
      telephone: ['', [Validators.required, Validators.pattern(/^0[1-9]{1}[0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/)]],
      login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]],
    });
  }
}


