import { AuthServiceService } from './../../auth/auth-service.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleNavbar = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authservice: AuthServiceService) { }

  ngOnInit() {
    this.authSubscription = this.authservice.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  toggleSideNav() {
    this.toggleNavbar.emit();

  }
  onLogOut() {
    this.authservice.logout()
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }



}
