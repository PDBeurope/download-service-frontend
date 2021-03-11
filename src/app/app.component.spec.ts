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


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
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

  it('should reset error', () => {
    component.errorEntryText = "not null";
    component.resetError();
    expect(component.errorEntryText).toEqual('');
  });

  it('should assign conformer', () => {
    component.radioCompoundSdfChange();
    expect(component.compoundSdfConformer).toEqual('model');
  });

  
  it('should reset everything upon change in form selection', () => {
    component.compoundPdbAtom = "not null";
    component.radioEntryChange();
    expect(component.compoundPdbAtom).toEqual('');
  });

  it('should emulate entry without choice', () => {
    component.pdbid = "";
    component.chosenformat = "";
    component.buttonClicked("entry");
    expect(component.errorEntryText).toEqual('Please choose the type of data to download.');
  });

  it('should emulate entry correct with correct input and format', () => {
    component.pdbid = "1cbs, 3tu8";
    component.chosenformat = "archive-mmCIF";
    component.buttonClicked("entry");
    expect(component.fdstype).toEqual("archive");
  });

  it('should emulate compound without compoundid', () => {
    component.compoundid = "";
    component.buttonClicked("compound");
    expect(component.errorCompoundText).toContain("Please choose the type of data to download.");
  });

  it('should check compound pdb pair input correctly', () => {
    component.compoundPdbAtom = "conventional";
    component.compoundPdbConformer = "";
    component.checkCompoundPairInput();
    component.fdsConfig = {};
    component.setDownloadParams("compound");
    expect(component.errorCompoundText).toContain("You need to choose the conformer");
  });

  it('should check compound sdf pair input correctly', () => {
    component.compoundSdfConformer = "model";
    component.checkCompoundPairInput();
    expect(component.errorCompoundText).toContain("You need to choose the type");
  });

  it('should reset parameters on radio compound mmcif change', () => {
    component.compoundPdbAtom = "conventional";
    component.radioCompoundMmcifChange();
    expect(component.compoundPdbAtom).toEqual("");
  });

  it('should reset parameters on radio compound pdb change', () => {
    component.errorEntryText = "some error";
    component.radioCompoundPdbChange();
    expect(component.errorEntryText).toEqual("");
  });

  it('should set the correct params for Compounds MMCif', () => {
    component.compoundMmcif = 'compound-mmcif-individual';
    component.fdsConfig = {};
    component.setDownloadParams("compound");
    expect(component.fdsConfig['combined']).toEqual(false);
  });

});
