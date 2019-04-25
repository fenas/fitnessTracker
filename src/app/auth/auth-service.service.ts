import { UiService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';




@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authChange = new Subject<boolean>();
  isAuthenticated = false;
  private user: User;


  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private trainingservice: TrainingService,
    private snackBar: MatSnackBar,
    private uiservice: UiService) { }


  initAuthListner() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(user);
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingservice.cancelSubscritions();
        this.isAuthenticated = false;
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }



  registerUser(authData: AuthData) {

    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    this.uiservice.showSpinner.next(true); // for showing spinner at the time of fetching details,cought and used in loin component
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiservice.showSpinner.next(false); // for stop showing spinner and showing button
        console.log(result);
      }).catch(error => {
        this.uiservice.showSpinner.next(false);

        this.snackBar.open(error.message, null, {
          duration: 3000
        });
        console.log(error);
      });
  }

  login(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    this.uiservice.showSpinner.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email,
      authData.password).then(result => {
        this.uiservice.showSpinner.next(false);
        console.log(result); // there is a listner in appcomponent.ts which always listens to isauthlistner() here,
        // which is triggred only when auth is sucess
        // and redirects to training
      }).catch(error => {
        this.uiservice.showSpinner.next(false);
        this.snackBar.open(error.message, null, {
          duration: 3000
        });
        console.log(error);
      });


  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
