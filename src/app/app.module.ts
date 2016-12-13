import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { MangolModule } from '../lib/index';

import { CopernicusDemoComponent } from './app.component';

@NgModule({
  declarations: [
    CopernicusDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    MangolModule.forRoot(),
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [CopernicusDemoComponent]
})
export class CopernicusDemoModule { }
