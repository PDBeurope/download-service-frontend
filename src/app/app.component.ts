import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { DownloadService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chosenformat: string;
  compoundPdbAtom: string;
  compoundPdbConformer: string;
  compoundMmcif: string;
  compoundSdfCombined: string;
  compoundSdfConformer: string;
  pdbid: string;
  compoundid: string;
  public fdsConfig: any;
  public fdstype: any;
  public hashedurl: any;
  public errorEntryText: any;
  public errorCompoundText: any;
  public isLoadingEntry: boolean;
  public isLoadingCompound: boolean;
  title = "PDBe Download Service";

  constructor(
    private downloadService: DownloadService
  ) {
    
  }

  buttonClicked(apiType): void {
    this.resetError();
    this.fdsConfig = {};
    
    let correctids : string[] = [];
    if (apiType === "entry") {
      this.isLoadingEntry = true;
      if (!(this.pdbid)) {
        this.errorEntryText="Please enter at least one PDB ID.";
        this.isLoadingEntry = false;
      }
      if (!(this.chosenformat)) {
        this.errorEntryText="Please choose the type of data to download.";
        this.isLoadingEntry = false;
      }
      correctids = this.pdbid.split(/,| |;|\t|\r?\n/);
    }
    else {
      this.isLoadingCompound = true;
      if (!(this.compoundid)) {
        this.errorCompoundText="Please enter at least one small molecule ID.";
        this.isLoadingCompound = false;
      }
      if (!(this.compoundMmcif || this.compoundPdbAtom || this.compoundPdbConformer || this.compoundSdfCombined || this.compoundSdfConformer)) {
        this.errorCompoundText="Please choose the type of data to download.";
        this.isLoadingCompound = false;
      }
      if (!(this.compoundMmcif)) { this.checkCompoundPairInput();}
      correctids = this.compoundid.split(/,| |;|\t|\r?\n/);
    }
    correctids = correctids.map(Function.prototype.call, String.prototype.trim)
    correctids = correctids.filter(this.onlyUnique).filter(n => n);

    this.fdsConfig = {'ids': correctids };

    if (!(this.errorEntryText || this.errorCompoundText)){
      this.setDownloadParams(apiType);
      this.postFile(apiType);
    }
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  checkCompoundPairInput() {
    if (this.compoundPdbAtom || this.compoundPdbConformer) {
      if (!(this.compoundPdbAtom)){ 
        this.isLoadingCompound = false;
        this.errorCompoundText = "You need to choose the atom naming scheme for to download small molecules data in PDB format."
      } 
      if (!(this.compoundPdbConformer)){ 
        this.isLoadingCompound = false;
        this.errorCompoundText = "You need to choose the conformer to download small molecules data in PDB format."
      } 
    }
    if (this.compoundSdfConformer || this.compoundSdfCombined) {
      if (!(this.compoundSdfCombined)){ 
        this.isLoadingCompound = false;
        this.errorCompoundText = "You need to choose the type (combined or individual) of SDF to download.";
      } 
      if (!(this.compoundSdfConformer)){ 
        this.isLoadingCompound = false;
        this.errorCompoundText = "You need to choose the conformer to download small molecules data in SDF format.";
      } 
    }
  }

  getDownloadParams() {
    let downloadParams: any = {
      'archive-mmCIF' : { 'data_format' : 'cif'},
      'archive-PDB' : { 'data_format' : 'pdb'},
      'assembly-all' : { 'preferred_only' : false },
      'assembly-preferred' : { 'preferred_only' : true },
      'fasta-combined' : {'combined' : true },
      'fasta-individual' : {'combined' : false },
      'validation-report-full' : { 'report_type' : 'full' },
      'validation-report-summary' : { 'report_type' : 'summary' }, 
    }
    let fdsType: any = {
      'archive-mmCIF' : 'archive',
      'archive-PDB' : 'archive',
      'updated-mmCIF' : 'updated',
      'assembly-all' : 'assemblies',
      'assembly-preferred' : 'assemblies',
      'structure-factors' : 'structure-factors',
      'nmr-data' : 'nmr-data',
      'fasta-combined' : 'sequences',
      'fasta-individual' : 'sequences',
      'validation-report-full' : 'validation-report',
      'validation-report-summary' : 'validation-report',
      'validation-data' : 'validation-data',
      'map-coefficients' : 'map-coefficients'
    }

    this.fdstype = fdsType[this.chosenformat];
    if (this.chosenformat in downloadParams) {
      for (let key in downloadParams[this.chosenformat]) {
        let value = downloadParams[this.chosenformat][key];
        this.fdsConfig[key] = value
      }
    }
  }

  getDownloadParamsCompoundMMcif() {
    this.chosenformat = 'compound-mmcif';
    this.fdstype = 'mmcif';
    if (this.compoundMmcif === 'compound-mmcif-combined') {
      this.fdsConfig['combined'] = true;
    }
    if (this.compoundMmcif === 'compound-mmcif-individual') {
      this.fdsConfig['combined'] = false;
    }
  }

  getDownloadParamsCompoundPdb(){
    this.chosenformat = 'compound-PDB';
    this.fdstype = 'pdb';
    if (this.compoundPdbAtom === 'conventional') { this.fdsConfig['atom_naming_scheme'] = 'conventional'; }
    else {this.fdsConfig['atom_naming_scheme'] = 'alternative';}
    if (this.compoundPdbConformer === 'model') {this.fdsConfig['conformer'] = 'model';}
    else {this.fdsConfig['conformer'] = 'ideal';}
  }

  getDownloadParamsCompoundSdf() {
    this.chosenformat = 'compound-sdf';
    this.fdstype = 'sdf';
    if (this.compoundSdfCombined === 'combined') { this.fdsConfig['combined'] = true; }
    else {this.fdsConfig['combined'] = false;}
    if (this.compoundSdfConformer === 'model') {this.fdsConfig['conformer'] = 'model';}
    else {this.fdsConfig['conformer'] = 'ideal';}
  }

  setDownloadParams(apiType): void {
    if (apiType === "entry") {
      this.getDownloadParams();
    }
    else {
      if (this.compoundMmcif) {
        this.getDownloadParamsCompoundMMcif();
      }
      else if (this.compoundPdbAtom || this.compoundPdbConformer) {
        this.getDownloadParamsCompoundPdb();
      }
      else if (this.compoundSdfConformer || this.compoundSdfCombined) {
        this.getDownloadParamsCompoundSdf();
      }
    }
  }

  postFile(apiType): void {
    this.downloadService.postFileDownloadServer(apiType,this.fdstype,this.fdsConfig).subscribe(
      response => {
        this.errorEntryText = "";
        this.errorCompoundText = "";
        this.hashedurl = response['url'].replace('http:', 'https:');
        this.getFile(apiType);
      },
      err => {
        if (apiType === "entry") {
          this.isLoadingEntry = false;
          this.errorEntryText = err;
        }
        else {
          this.isLoadingCompound = false;
          this.errorCompoundText = err;
        }
      }
    );
  }

  getFile(apiType): void {
    this.downloadService.getFileDownloadServer(this.hashedurl).subscribe(
      response2 => {
        //if (response2.type == "application/gzip") {
        if (response2.status == '200') {
          setTimeout(() => {
            console.log("rp",response2.body.size);
            this.downloadFile(response2.body, `${this.chosenformat}.tar.gz`, 'application/tar+gzip');
            this.isLoadingEntry = false;
            this.isLoadingCompound = false;
          }, 1000);

        }
        else if (response2.status == '202') { //json
          //this.getFile();
          setTimeout(() => {
            this.getFile(apiType);
          }, 500); // delay by 500 ms every time request is re-made
        }
        else {
          let errortext = `Error: The download server returns non 200/202 status: ${response2.status}`;
          if (apiType === "entry") {
            this.errorEntryText = errortext;
            this.isLoadingEntry = false;
          }
          else {
            this.errorCompoundText = errortext;
            this.isLoadingCompound = false;
          }
        }
      },
      err2 => {
        if (apiType === "entry") {this.errorEntryText = err2; this.isLoadingEntry = false;}
        else {this.errorCompoundText = err2; this.isLoadingCompound = false;}
      }
    );
  }

  downloadFile(content, fileName, mimeType) {
    const a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';

    if (navigator.msSaveBlob) { // IE10
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { // html5 A[download]
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
  }

  resetEntry() {
    this.chosenformat="";
  }

  resetCompoundPDBformat() {
    this.compoundPdbAtom = "";
    this.compoundPdbConformer = "";
  }

  resetCompoundMmcifformat() {
    this.compoundMmcif = "";
  }

  resetCompoundSdfformat(){
    this.compoundSdfCombined = "";
    this.compoundSdfConformer = "";
  }

  radioEntryChange() {
    this.resetCompoundPDBformat();
    this.resetCompoundMmcifformat();
    this.resetCompoundSdfformat();
    this.resetError();
  }

  radioCompoundMmcifChange() {
    this.resetCompoundPDBformat();
    this.resetEntry();
    this.resetCompoundSdfformat();
    this.resetError();
  }

  radioCompoundPdbChange() {
    if (!(this.compoundPdbAtom)) {this.compoundPdbAtom = "conventional";}
    if (!(this.compoundPdbConformer)) {this.compoundPdbConformer = "model"}
    this.resetEntry();
    this.resetCompoundMmcifformat();
    this.resetCompoundSdfformat();
    this.resetError();
  }

  radioCompoundSdfChange() {
    if (!(this.compoundSdfConformer)) {this.compoundSdfConformer = "model";}
    if (!(this.compoundSdfCombined)) {this.compoundSdfCombined = "combined";}
    this.resetEntry();
    this.resetCompoundMmcifformat();
    this.resetCompoundPDBformat();
    this.resetError();
  }

  resetError() {
    this.errorEntryText = "";
    this.errorCompoundText = "";
  }
  
}
