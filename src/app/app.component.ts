import { AuthServiceService } from './auth/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';
  constructor(private authservice: AuthServiceService) { }

  ngOnInit() {
    this.authservice.initAuthListner();

  }
}