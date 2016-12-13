import { Component, Input, Output, OnInit, EventEmitter, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'mangol-toolbar',
  template: `
        <div class="toolbar-div">
			<md-list>
            	<md-list-item *ngFor="let element of elements">
                    <button md-mini-fab [class.active]="element.active" [disabled]="element.disabled" (click)="activateElement(element)">
                    	<md-icon fontSet="{{element.fontSet}}" fontIcon="{{element.fontIcon}}"></md-icon>
                    </button>
                </md-list-item>
            </md-list>
        </div>
    `
})
export class MangolToolbarComponent implements OnInit {

  @HostBinding('class') class = 'mangol-toolbar';

  @Input() options: any;
  @Output() elementActivated = new EventEmitter();

  myColor: string = 'primary';
  elements: any[];

  constructor() {
    this.elements = [];
  }

  public ngOnInit(): any {
    if (this.options.hasOwnProperty('layertree')) {
      let obj: any = this.options.layertree;
      this.elements.push({
        type: 'layertree',
        title: obj.hasOwnProperty('title') ? obj.title : 'Layer manager',
        fontSet: obj.hasOwnProperty('fontSet') ? obj.fontSet : 'ms',
        fontIcon: obj.hasOwnProperty('fontIcon') ? obj.fontIcon : 'ms-layers',
        active: obj.hasOwnProperty('active') ? obj.active : false,
        disabled: obj.hasOwnProperty('disabled') ? obj.disabled : false
      });
    }
    if (this.options.hasOwnProperty('measure')) {
      let obj: any = this.options.measure;
      this.elements.push({
        type: 'measure',
        title: obj.hasOwnProperty('title') ? obj.title : 'Measure',
        fontSet: obj.hasOwnProperty('fontSet') ? obj.fontSet : 'ms',
        fontIcon: obj.hasOwnProperty('fontIcon') ? obj.fontIcon : 'ms-measure-distance',
        active: obj.hasOwnProperty('active') ? obj.active : false,
        disabled: obj.hasOwnProperty('disabled') ? obj.disabled : false
      });
    }
    if (this.options.hasOwnProperty('print')) {
      let obj: any = this.options.print;
      this.elements.push({
        type: 'print',
        title: obj.hasOwnProperty('title') ? obj.title : 'Print',
        fontSet: obj.hasOwnProperty('fontSet') ? obj.fontSet : 'ms',
        fontIcon: obj.hasOwnProperty('fontIcon') ? obj.fontIcon : 'ms-printer',
        active: obj.hasOwnProperty('active') ? obj.active : false,
        disabled: obj.hasOwnProperty('disabled') ? obj.disabled : false
      });
    }
    if (this.options.hasOwnProperty('ndvi')) {
      let obj: any = this.options.ndvi;
      this.elements.push({
        type: 'ndvi',
        title: obj.hasOwnProperty('title') ? obj.title : 'Raster calculator',
        fontSet: obj.hasOwnProperty('fontSet') ? obj.fontSet : 'ms',
        fontIcon: obj.hasOwnProperty('fontIcon') ? obj.fontIcon : 'ms-tiles',
        active: obj.hasOwnProperty('active') ? obj.active : false,
        disabled: obj.hasOwnProperty('disabled') ? obj.disabled : false
      });
    }
    let activeIdx = null;
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].active === true && this.elements[i].disabled === false) {
        activeIdx = i;
        break;
      }
    }
    // by default, set active the first active element
    if (activeIdx === null) {
      activeIdx = 0;
    }
    this.activateElement(this.elements[activeIdx]);
  }

  public activateElement(element: any): any {
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i] === element) {
        this.elements[i].active = true;
        this.elementActivated.emit(element);
      } else {
        this.elements[i].active = false;
      }
    }
  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ],
  exports: [
    MangolToolbarComponent
  ],
  declarations: [
    MangolToolbarComponent
  ]
})
export class MangolToolbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolToolbarModule,
      providers: []
    };
  }
}
