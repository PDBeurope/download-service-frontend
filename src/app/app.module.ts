import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DownloadService } from './app.service';
import {HttpClientModule} from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip'; 


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatRadioModule,
    MatExpansionModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [DownloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
