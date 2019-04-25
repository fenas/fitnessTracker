import { AuthServiceService } from './../../auth/auth-service.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideBar = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authservice: AuthServiceService) { }

  ngOnInit() {
    this.authSubscription = this.authservice.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  closeSideNav() {
    this.closeSideBar.emit();
  }

  onLogOut() {
    this.closeSideNav();
    this.authservice.logout();
  }

}
