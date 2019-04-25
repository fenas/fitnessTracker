import { UiService } from './../../shared/ui.service';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate;
  ShowSpinner = false;
  isLoading: Subscription;

  constructor(private authService: AuthServiceService, private uiservice: UiService) { }

  ngOnInit() {
    this.uiservice.showSpinner.subscribe(showspinner => {
      this.ShowSpinner = showspinner;
    }

    )
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
