import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DialogInsertionDirective } from '../dialog-insertion.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnDestroy, AfterViewInit {
  public childComponentType: Type<any>;
  public componentRef: ComponentRef<any>;
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();
  @ViewChild(DialogInsertionDirective) insertionPoint: DialogInsertionDirective;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(event: MouseEvent) {}

  onDialogClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  loadChildComponent(childComponentType: Type<any>) {
    let componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(childComponentType);
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
  ngOnDestroy(): void {
    this.componentRef.destroy();
  }
}
