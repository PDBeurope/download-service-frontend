import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';
import {ComponentFixture} from '@angular/core/testing';
import {DataTypeBoxComponent} from './data-type-box/data-type-box.component'


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DataTypeBoxComponent
      ],
      imports: [ HttpClientTestingModule, 
        BrowserModule,
        MatFormFieldModule,
        MatRadioModule,
        MatExpansionModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatInputModule,
        FormsModule,
        MatProgressSpinnerModule ],

    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'download-service-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PDBe Download Service');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('PDBe Download Service');
  });

  it('tooltip classes should have non-empty tooltip message', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    var el = compiled.querySelector(".tooltipped");
    const tooltipElement = el.getAttribute('ng-reflect-message');
    expect(tooltipElement).not.toEqual(null);   
  });

});
