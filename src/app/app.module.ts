import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  DateAdapter,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule, MatNativeDateModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientService} from './http-client.service';
import {TextMaskModule} from 'angular2-text-mask';
import { MaskDateDirective } from './mask-date.directive';
import {InputMaskModule} from 'primeng/inputmask';

@NgModule({
  declarations: [
    AppComponent,
    MaskDateDirective
  ],
  imports: [
    BrowserModule, MatCardModule, BrowserAnimationsModule, MatButtonModule,
    MatAutocompleteModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule,
    HttpClientModule, MatDatepickerModule, MatNativeDateModule, TextMaskModule, InputMaskModule
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
