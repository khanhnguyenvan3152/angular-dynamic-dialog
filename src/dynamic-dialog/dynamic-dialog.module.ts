import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { ExampleComponent } from './example/example.component';
import { DialogInsertionDirective } from './dialog-insertion.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent, DialogInsertionDirective],
  exports: [DialogComponent],
  entryComponents: [DialogComponent],
})
export class DynamicDialogModule {}
