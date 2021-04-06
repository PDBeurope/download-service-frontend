import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'data-content',
  templateUrl: './data-content.component.html',
  styleUrls: ['./data-content.component.css']
})
export class DataContentComponent implements OnInit {

  @Input() item:any;
  title = "PDBe Download Service";

  constructor() { }

  ngOnInit(): void {
  }

}
