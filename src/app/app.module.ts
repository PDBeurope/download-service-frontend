import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DownloadService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataTypeBoxComponent } from './data-type-box/data-type-box.component';
import { DataContentComponent } from './data-content/data-content.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    DataTypeBoxComponent,
    DataContentComponent
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
  providers: [DownloadService, { provide: 'DOWNLOAD_API_URL', useValue: environment.downloadAPIUrl },],
  bootstrap: [AppComponent]
})
export class AppModule { }
