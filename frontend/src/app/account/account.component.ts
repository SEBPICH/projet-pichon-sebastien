import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any; 

  constructor(private apiService: ApiService, private sharedService: SharedService) {}

  ngOnInit(): void {

    this.apiService.getUserInfo().subscribe(
      (response) => {
        this.user = response; 
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
