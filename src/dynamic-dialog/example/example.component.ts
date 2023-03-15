import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../dialog-config';
import { DialogRef } from '../dialogRef';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExampleComponent implements OnInit {
  public title = '';
  constructor(
    private config: DialogConfig<ExampleDialogConfig>,
    private dialogRef: DialogRef
  ) {}

  ngOnInit() {
    this.title = this.config.data.title;
  }

  public onClose() {
    this.dialogRef.close('siu');
  }
}

export interface ExampleDialogConfig {
  title: string;
}
