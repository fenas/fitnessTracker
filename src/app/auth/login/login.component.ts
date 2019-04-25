import { Subscription } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  ShowSpinner = false;
  loadingSubs: Subscription;
  constructor(private authService: AuthServiceService, private uiService: UiService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.showSpinner.subscribe(showspiner => {
      this.ShowSpinner = showspiner;
    }

    );
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

}
