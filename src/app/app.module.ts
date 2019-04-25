import { UiService } from './shared/ui.service';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { NewtrainingComponent } from './training/newtraining/newtraining.component';
import { CurrenttrainingComponent } from './training/currenttraining/currenttraining.component';
import { PasttrainingComponent } from './training/pasttraining/pasttraining.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StoptrainingComponent } from './training/currenttraining/stop-training.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from './auth/auth-service.service';
import { TrainingService } from './training/training.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    NewtrainingComponent,
    CurrenttrainingComponent,
    PasttrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StoptrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule, AngularFireAuthModule
  ],
  providers: [AuthServiceService, TrainingService, UiService],
  bootstrap: [AppComponent],
  entryComponents: [StoptrainingComponent]
})
export class AppModule { }
