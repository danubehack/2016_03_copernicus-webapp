import { Component, OnInit, Input, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { MangolMap, MangolLayer } from '../core/_index';


@Component({
  selector: 'mangol-ndvi',
  template: `
      <div>
        <div>Select CIR layer</div>
        <div *ngFor="let layer of layers"></div>
        <md-radio-group (change)="onChangeCir($event.value);">
          <md-radio-button *ngFor="let layer of layers" [value]="layer">{{layer.getName()}}</md-radio-button>
        </md-radio-group>
        <div>Select NIR layer</div>
        <md-radio-group (change)="onChangeNir($event.value);">
          <md-radio-button *ngFor="let layer of layers" [value]="layer">{{layer.getName()}}</md-radio-button>
        </md-radio-group>
        <p>


          <button md-raised-button (click)="calculateNdvi()"
              [disabled]="chosenCir===null || chosenNir===null || chosenCir==chosenNir">CALCULATE NDVI</button>
              </p><p>
          <button md-raised-button (click)="clearNdvi()"
              [disabled]="chosenCir===null || chosenNir===null || chosenCir==chosenNir">CLEAR RESULTS</button>
        </p>
	    </div>
    `
})
export class MangolNdviComponent implements OnInit {
  @HostBinding('class') class = 'mangol-ndvi';

  @Input() map: MangolMap;

  layers: MangolLayer[];
  chosenCir: MangolLayer;
  chosenNir: MangolLayer;
  ndviLayer: MangolLayer;

  constructor() {
    this.layers = [];
    this.chosenCir = null;
    this.chosenNir = null;
    this.ndviLayer = null;
  }

  public ngOnInit(): any {
    let allowedNames = ['NIR', 'CIR'];
    for (let i = 0; i < this.map.getMangolLayers().length; i++) {
      if (allowedNames.indexOf(this.map.getMangolLayers()[i].getName()) !== -1) {
        this.layers.push(this.map.getMangolLayers()[i]);
      }
    }
  }

  onChangeCir(value: any): any {
    this.chosenCir = value;
  }

  onChangeNir(value: any): any {
    this.chosenNir = value;
  }

  private ndvi(cirs: number[], nirs: number[]) {
    let cir = ((cirs[0] + cirs[1] + cirs[2]) / 3) * 39.52;
    let nir = ((nirs[0] + nirs[1] + nirs[2]) / 3) * 40.4;
    let value = (nir - cir) / (nir + cir);
    return value;
  }

  clearNdvi(): any {
    let layers = this.map.getLayers();
    if (layers.getArray().length > 3) {
      this.map.removeLayer(layers.getArray()[3]);
    }
  }

  calculateNdvi(): any {
    let layers = this.map.getLayers();
    if (layers.getArray().length > 3) {
      this.map.removeLayer(layers.getArray()[3]);
    }

    let raster = new ol.source.Raster({
      sources: [this.chosenCir.getLayer().getSource(), this.chosenNir.getLayer().getSource()],
      operationType: 'pixel',
      operation: function (pixels: any[], data: any) {
        let pixel = [];
        let pixelCir = pixels[0];
        let pixelNir = pixels[1];
        let value = this.ndvi(pixelCir, pixelNir);
        pixel[0] = 0;
        pixel[1] = 255;
        pixel[2] = 0;
        let opacity = 255;
        if (value >= -1 && value < -0.2) {
          pixel = [0, 0, 0, 0];
        } else if (value >= -0.2 && value < -0.1) {
          pixel = [255, 0, 0, opacity];
        } else if (value >= -0.1 && value < 0) {
          pixel = [191, 0, 0, opacity];
        } else if (value >= 0 && value < 0.1) {
          pixel = [127, 0, 0, opacity];
        } else if (value >= 0 && value < 0.2) {
          pixel = [255, 255, 0, opacity];
        } else if (value >= 0.2 && value < 0.3) {
          pixel = [191, 191, 0, opacity];
        } else if (value >= 0.3 && value < 0.4) {
          pixel = [127, 127, 0, opacity];
        } else if (value >= 0.4 && value < 0.5) {
          pixel = [0, 255, 255, opacity];
        } else if (value >= 0.5 && value < 0.6) {
          pixel = [0, 191, 191, opacity];
        } else if (value >= 0.6 && value < 0.7) {
          pixel = [0, 127, 127, opacity];
        } else if (value >= 0.7 && value < 0.8) {
          pixel = [0, 255, 0, opacity];
        } else if (value >= 0.8 && value < 0.9) {
          pixel = [0, 191, 0, opacity];
        } else if (value >= 0.9 && value <= 1) {
          pixel = [0, 127, 0, opacity];
        }
        return pixel;
      },
      lib: {
        ndvi: this.ndvi
      }
    });
    raster.set('threshold', 0.15);

    raster.on('beforeoperations', function (event) {
      // let createCounts = function (min, max, num): any {
      //   let values = new Array(num);
      //   for (let i = 0; i < num; ++i) {
      //     values[i] = 0;
      //   }
      //   return {
      //     min: min,
      //     max: max,
      //     values: values,
      //     delta: (max - min) / num
      //   };
      // };
      // event.data.counts = createCounts(this.minVgi, this.maxVgi, this.bins);
      event.data.threshold = raster.get('threshold');
    });

    raster.on('afteroperations', function (event) {

    });

    this.map.addLayer(new ol.layer.Image({
      source: raster
    }));

  }

}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  exports: [
    MangolNdviComponent
  ],
  declarations: [
    MangolNdviComponent
  ]
})
export class MangolNdviModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolNdviModule,
      providers: []
    };
  }
}

