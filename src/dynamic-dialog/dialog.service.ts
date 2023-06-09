import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { DialogConfig } from './dialog-config';
import { DialogInjector } from './dialog.injector';
import { DialogComponent } from './dialog/dialog.component';
import { DialogRef } from './dialogRef';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogComponentRef: ComponentRef<DialogComponent>;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  appendDialogToComponentBody(config: DialogConfig) {
    const map = new WeakMap();
    map.set(DialogConfig, config);
    //set dialog ref
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);
    const sub = dialogRef.afterClosed.subscribe((rs) => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(
      new DialogInjector(this.injector, map)
    );
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.dialogComponentRef = componentRef;
    this.dialogComponentRef.instance.onClose.subscribe((rs) => {
      this.removeDialogComponentFromBody();
    });
    return dialogRef;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  public open(componentType: Type<any>, config: DialogConfig) {
    const dialogRef = this.appendDialogToComponentBody(config);
    this.dialogComponentRef.instance.childComponentType = componentType;
    return dialogRef;
  }
}
