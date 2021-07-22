import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { DownloadService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "PDBe Download Service";

  descriptorStructure =
    {
      boxTitle: "Structure and Sequence",
      idType: "PDB",
      fE: "1cbs",
      sE: "3tu8"
    }

  descriptorSmallMolecules =
    {
      boxTitle: "Small Molecules",
      idType: "small molecule",
      fE: "DU",
      sE: "HEM"
    }

  descriptorSifts =
    {
      boxTitle: "Residue-level mapping between UniProt and PDB entries (SIFTS)",
      idType: "PDB",
      fE: "1cbs",
      sE: "5hht"
    }

  dataContentSmallMolecules = [
    {
      'title': "wwPDB Chemical Component Dictionary",
      'titleText': "Standard wwPDB CCD file with PDBeChem data enrichments. This includes ID mapping to external resources, CHEMBL synonyms, DrugBank details, 2D coordinates, RDKit-generated 3D conformer, as well as scaffold and fragment information.",
      'content': [
        {
          'subtitle': 'Type',
          'subcontent': ['Combined mmCIF', 'Individual mmCIFs'],
          'values': ['compound-mmcif-combined', 'compound-mmcif-individual'],
          'text': [
            "Updated CCD files in CIF format combined in a single file.",
            "Updated CCD files in CIF format combined in as individual files."
          ]
        }
      ]
    },
    {
      'title': "Coordinates (PDB format)",
      'content': [
        {
          'subtitle': 'Model coordinates',
          'subText': "Conformer generated based on mmCIF _chem_comp_atom.model_Cartn_ item.",
          'subcontent': ['Conventional atom naming scheme', 'Alternative atom naming scheme'],
          'values': ['model-conventional', 'model-alternative'],
          'text': [
            "Use the conventional atom identifier, corresponding to the mmCIF _chem_comp_atom.atom_id item.",
            "Use the alternative identifier for atoms, corresponding to the mmCIF _chem_comp_atom.alt_atom_id item."
          ]
        },
        {
          'subtitle': 'Ideal coordinates',
          'subText': "Conformer generated based on mmCIF _chem_comp_atom.model_Cartn_ideal item.",
          'subcontent': ['Conventional atom naming scheme', 'Alternative atom naming scheme'],
          'values': ['ideal-conventional', 'ideal-alternative'],
          'text': [
            "Use the conventional atom identifier, corresponding to the mmCIF _chem_comp_atom.atom_id item.",
            "Use the alternative identifier for atoms, corresponding to the mmCIF _chem_comp_atom.alt_atom_id item."
          ]
        }
      ]
    },
    {
      'title': "Coordinates (SDF format)",
      'content': [
        {
          'subtitle': 'Model coordinates',
          'subText': "Conformer generated based on mmCIF _chem_comp_atom.model_Cartn_ item.",
          'subcontent': ['Combined SDF', 'Individual SDF'],
          'values': ['model-combined', 'model-individual'],
          'text': [
            "Chemical component coordinates in a single SDF file.",
            "Chemical component coordinates in individual SDF files."
          ]
        },
        {
          'subtitle': 'Ideal coordinates',
          'subText': "Conformer generated based on mmCIF _chem_comp_atom.model_Cartn_ideal item.",
          'subcontent': ['Combined SDF', 'Individual SDF'],
          'values': ['ideal-combined', 'ideal-individual'],
          'text': [
            "Chemical component coordinates in a single SDF file.",
            "Chemical component coordinates in individual SDF files."
          ]
        }
      ]
    },
  ]

  dataContentStructure = [
    {
      'title': "Coordinate data",
      'content': [
        {
          'subtitle': 'Coordinates',
          'subcontent': ['Updated mmCIF file', 'Archive mmCIF file', 'PDB file'],
          'values': ['updated-mmCIF', 'archive-mmCIF', 'archive-PDB'],
          'text': [
            "An updated version of the PDB archive mmCIF format file. Generated with standardisation of vocabularies, and addition of connectivity information for every chemical compound present in the PDB entry.",
            "The PDB archive file in mmCIF file format.",
            "The PDB archive file in PDB file format."
          ]
        },
        {
          'subtitle': 'Assemblies',
          'subcontent': ['All assemblies', 'Preferred assemblies'],
          'values': ['assembly-all', 'assembly-preferred'],
          'text': [
            "All the annotated assemblies for a set of PDB entries.",
            "Only the preferred assemblies for a set of PDB entries"
          ]
        },
        {
          'subtitle': 'Experimental data',
          'subcontent': ['Structure factors', 'Electron density map coefficients', 'NMR data'],
          'values': ['structure-factors', 'map-coefficients', 'nmr-data'],
          'text': [
            "Structure factors for a set of PDB entries.",
            "Electron density map coefficients (2Fo - Fc) and (Fo - Fc) for a set of PDB entries in mmCIF file format.",
            "Chemical shifts and NMR restraints combined in a single file. This data is provided in both STAR and NMR Exchange Format (NEF) formats per PDB entry."
          ]
        }
      ]
    },
    {
      'title': "Validation data",
      'content': [
        {
          'subtitle': 'Validation report (PDF)',
          'subcontent': ['Full', 'Summary'],
          'values': ['validation-report-full', 'validation-report-summary'],
          'text': [
            "Full wwPDB validation reports for a set of PDB entries.",
            "The summary of validation reports for a set of PDB entries."
          ]
        },
        {
          'subtitle': 'Validation data',
          'subcontent': ['Validation data (XML)'],
          'values': ['validation-data'],
          'text': [
            "Validation data for a set of PDB entries."
          ]
        }
      ]
    },
    {
      'title': "Sequences (FASTA)",
      'content': [
        {
          'subtitle': 'Sequences',
          'subcontent': ['Combined FASTA', 'Individual FASTA'],
          'values': ['fasta-combined', 'fasta-individual'],
          'text': [
            "Sequences for a set of PDB entries. in a single FASTA file.",
            "Sequences for a set of PDB entries. in individual FASTA files."
          ]
        }
      ]
    },
  ]

  dataContentSifts = [
    {
      'title': "Residue-level mapping",
      'titleText': "Residue-level mapping between UniProt and PDB entries",
      'content': [
        {
          'subtitle': 'SIFTS annotation',
          'subcontent': ['XML format'],
          'values': ['sifts'],
          'text': [
            "Residue-level mapping between UniProt and PDB entries in XML format.",
          ]
        }
      ]
    },
  ]
  constructor() {
  }

}
