import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { DynamicDialogModule } from './dynamic-dialog/dynamic-dialog.module';
import { DialogService } from './dynamic-dialog/dialog.service';
import {
  ExampleComponent,
  ExampleDialogConfig,
} from './dynamic-dialog/example/example.component';
import { DialogConfig } from './dynamic-dialog/dialog-config';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, DynamicDialogModule, SharedModule],
  template: `<button (click)="showDialog()">Open dialog</button>
  <app-virtual-scroll></app-virtual-scroll>
  `,
})
export class App implements OnInit {
  name = 'Angular';
  constructor(private dialogService: DialogService) {}
  ngOnInit(): void {}

  showDialog() {
    this.dialogService
      .open(ExampleComponent, {
        data: {
          title: 'SIU',
        },
      } as DialogConfig<ExampleDialogConfig>)
      .afterClosed.subscribe((rs) => {
        console.log('siu');
      });
  }
}

bootstrapApplication(App);
