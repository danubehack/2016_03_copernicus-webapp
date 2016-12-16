import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'copernicus-app',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="mangol-demo">
      <div class="ribbon-box">
            <div class="ribbon-wrapper">
                <a href="https://github.com/danubehack/copernicus-webapp" target="_blank" title="GitHub repository">
                    <div class="ribbon">
                        <i class="fa fa-github"></i>
                    </div>
                </a>
            </div>
        </div>
        <div class="demo">
            <div class="demo-header">
                <h1 class="title">Copernicus webapp</h1>
            </div>
            <div class="demo-content">
                <mangol-container [config]="config"></mangol-container>
            </div>
        </div>
    </div>
      `
})
export class CopernicusDemoComponent implements OnInit {
  config: any;

  public ngOnInit(): any {
    this.config = {
      map: {
        renderer: 'webgl',
        target: 'demo-ndvi',
        view: {
          projection: 'EPSG:3857',
          center: ol.proj.fromLonLat([14.325, 49.174], 'EPSG:3857'),
          zoom: 12
        },
        layers: [
          {
            type: 'layer',
            name: 'OpenStreetMap layer',
            visible: true,
            opacity: 1,
            layer: new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          },
          {
            type: 'layer',
            name: 'BingMaps layer',
            visible: false,
            opacity: 1,
            layer: new ol.layer.Tile({
              source: new ol.source.BingMaps({
                key: 'AsuNZby9rIaMkZdd0LOnzUYFnsH5_Hkn-SYjx2xSbaYAzkRTBVF1uzlT4TRBqvpV',
                imagerySet: 'Aerial'
              })
            })
          },
          {
            type: 'layer',
            name: 'CIR',
            visible: true,
            opacity: 1.0,
            layer: new ol.layer.Tile({
              source: new ol.source.TileWMS({
                url: 'http://188.166.116.137:8081/geoserver/wms',
                params: {
                  LAYERS: 'cirgroup',
                  FORMAT: 'image/png'
                },
                projection: 'EPSG:3857',
                wrapX: false,
                crossOrigin: 'anonymous'
              })
            })
          }, {
            type: 'layer',
            name: 'NIR',
            visible: true,
            opacity: 1.0,
            layer: new ol.layer.Tile({
              source: new ol.source.TileWMS({
                url: 'http://188.166.116.137:8081/geoserver/wms',
                params: {
                  LAYERS: 'nirgroup',
                  FORMAT: 'image/png'
                },
                projection: 'EPSG:3857',
                wrapX: false,
                crossOrigin: 'anonymous'
              })
            })
          }
        ]
      },
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          layertree: {
            active: true
          },
          ndvi: {},
          print: {}
        }
      }
    };
  };
}
