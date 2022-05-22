import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http'; //to consume Angular service
import { ApiService } from './shared/api.service';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ViewUserComponent,
    ViewAllComponent,
    DeleteUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
