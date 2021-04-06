import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeBoxComponent } from './data-type-box.component';
import {DataContentComponent} from '../data-content/data-content.component';
import { BrowserModule } from '@angular/platform-browser';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';


describe('DataTypeBoxComponent', () => {
  let component: DataTypeBoxComponent;
  let fixture: ComponentFixture<DataTypeBoxComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ DataTypeBoxComponent, DataContentComponent],
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
    fixture = TestBed.createComponent(DataTypeBoxComponent);
    component = fixture.componentInstance;
    component.descriptorType = {
      boxTitle: "Structure and Sequence",
      idType: "PDB",
      fE: "1cbs",
      sE: "3tu8"
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset error', () => {

    component.errorEntryText = "not null";
    component.resetError();
    expect(component.errorEntryText).toEqual('');
  });

  //it('should assign conformer', () => {
  //  component.radioCompoundSdfChange();
  //  expect(component.compoundSdfConformer).toEqual('model');
  //});


  it('should emulate entry without choice', () => {
    component.pdbid = "";
    component.chosenformat = "";
    component.buttonClicked("entry");
    expect(component.errorEntryText).toEqual('Please choose the type of PDB data to download.');
  });

  it('should emulate entry correct with correct input and format', () => {
    component.pdbid = "1cbs, 3tu8";
    component.chosenformat = "archive-mmCIF";
    component.buttonClicked("entry");
    expect(component.fdstype).toEqual("archive");
  });

  it('should set the correct params for Compounds MMCif', () => {
    component.chosenformat = 'model-conventional';
    component.fdsConfig = {};
    component.getDownloadParams();
    expect(component.fdsConfig['atom_naming_scheme']).toEqual('conventional');
  });
});
