import { Component, OnInit, Input } from '@angular/core';
import { DownloadService } from '../app.service';

@Component({
  selector: 'data-type-box',
  templateUrl: './data-type-box.component.html',
  styleUrls: ['./data-type-box.component.css']
})
export class DataTypeBoxComponent implements OnInit {

  @Input() descriptorType:any;
  @Input() dataContent:any;
  @Input() submissionType:string;

  chosenformat: string;
  pdbid: string;
  public fdsConfig: any;
  public fdstype: any;
  public hashedurl: any;
  public errorEntryText: any;
  public isLoadingEntry: boolean;
  title = "PDBe Download Service";

  downloadParams: any = {
    'archive-mmCIF': {'data_format': 'cif'},
    'archive-PDB': {'data_format': 'pdb'},
    'assembly-all': {'preferred_only': false},
    'assembly-preferred': {'preferred_only': true},
    'fasta-combined': {'combined': true},
    'fasta-individual': {'combined': false},
    'validation-report-full': {'report_type': 'full'},
    'validation-report-summary': {'report_type': 'summary'},
    'compound-mmcif-combined': {'combined': true},
    'compound-mmcif-individual': {'combined': false},
    'model-conventional': {'atom_naming_scheme' : 'conventional', 'conformer' : 'model'},
    'model-alternative': {'atom_naming_scheme' : 'alternative', 'conformer' : 'model'},
    'ideal-conventional': {'atom_naming_scheme' : 'conventional', 'conformer' : 'ideal'},
    'ideal-alternative': {'atom_naming_scheme' : 'alternative', 'conformer' : 'ideal'},
    'model-combined': {'combined': true, 'conformer' : 'model'},
    'model-individual': {'combined': false, 'conformer' : 'model'},
    'ideal-combined': {'combined': true, 'conformer' : 'ideal'},
    'ideal-individual':{'combined': false, 'conformer' : 'ideal'},
  }
  fdsTypeDict: any = {
    'archive-mmCIF': 'archive',
    'archive-PDB': 'archive',
    'updated-mmCIF': 'updated',
    'assembly-all': 'assemblies',
    'assembly-preferred': 'assemblies',
    'structure-factors': 'structure-factors',
    'nmr-data': 'nmr-data',
    'fasta-combined': 'sequences',
    'fasta-individual': 'sequences',
    'validation-report-full': 'validation-report',
    'validation-report-summary': 'validation-report',
    'validation-data': 'validation-data',
    'map-coefficients': 'map-coefficients',
    'compound-mmcif-combined': 'mmcif',
    'compound-mmcif-individual': 'mmcif',
    'model-conventional': 'pdb',
    'model-alternative': 'pdb',
    'ideal-conventional': 'pdb',
    'ideal-alternative': 'pdb',
    'model-combined': 'sdf',
    'model-individual': 'sdf',
    'ideal-combined':'sdf',
    'ideal-individual':'sdf'
  }

  constructor(private downloadService: DownloadService) {}

  ngOnInit(): void {
  }
  
  buttonClicked(apiType): void {
    this.resetError();
    this.fdsConfig = {};
  
    let correctids: string[] = [];
   
    this.isLoadingEntry = true;
    if (!(this.pdbid)) {
      this.errorEntryText = "Please enter at least one "+this.descriptorType['idType']+" ID.";
      this.isLoadingEntry = false;
    }
    if (!(this.chosenformat)) {
      this.errorEntryText = "Please choose the type of " + this.descriptorType['idType']+ " data to download.";
      this.isLoadingEntry = false;
    }
    correctids = this.pdbid.split(/,| |;|\t|\r?\n/);
    correctids = correctids.map(Function.prototype.call, String.prototype.trim)
    correctids = correctids.filter(this.onlyUnique).filter(n => n);
  
    this.fdsConfig = {'ids': correctids};
  
    if (!(this.errorEntryText)) {
      this.getDownloadParams();
      this.postFile(apiType);
    }
  }
  
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  getDownloadParams() {
    this.fdstype = this.fdsTypeDict[this.chosenformat];
    if (this.chosenformat in this.downloadParams) {
      for (let key in this.downloadParams[this.chosenformat]) {
        let value = this.downloadParams[this.chosenformat][key];
        this.fdsConfig[key] = value
      }
    }
  }
  
  postFile(apiType): void {
    this.downloadService.postFileDownloadServer(apiType, this.fdstype, this.fdsConfig).subscribe(
      response => {
        this.errorEntryText = "";
        this.hashedurl = response['url'].replace('http:', 'https:');
        this.getFile(apiType);
      },
      err => {
          this.isLoadingEntry = false;
          this.errorEntryText = err;
      }
    );
  }
  
  getFile(apiType): void {
    this.downloadService.getFileDownloadServer(this.hashedurl).subscribe(
      response2 => {
        //if (response2.type == "application/gzip") {
        if (response2.status == '200') {
          setTimeout(() => {
            //console.log("rp", response2.body.size);
            this.downloadFile(response2.body, `${this.chosenformat}.tar.gz`, 'application/tar+gzip');
            this.isLoadingEntry = false;
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
            this.errorEntryText = errortext;
            this.isLoadingEntry = false;
        }
      },
      err2 => {
          this.errorEntryText = err2;
          this.isLoadingEntry = false;
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
  
  resetError() {
    this.errorEntryText = "";
  }

}
