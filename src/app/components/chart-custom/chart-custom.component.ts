import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MediaSize, DuiFormGeneratorService } from 'ng-dui';

@Component({
  selector: 'app-chart-custom',
  templateUrl: './chart-custom.component.html',
  styleUrls: ['./chart-custom.component.scss']
})
export class ChartCustomComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'line',
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3],
        type: 'line'
      }
    ]
  });

  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
  constructor(private _fgs: DuiFormGeneratorService) { }

  ngOnInit() {
  }

  get bodyGridStyle(): object {
    const mediaSize = this._fgs.getMediaSize();
    const bodyWrapper = {
      display: 'grid',
      height: '100%'
    };
    if (mediaSize === MediaSize.Large) {
      bodyWrapper['grid-template-columns'] = '2fr 8fr 2fr';
    } else if (mediaSize === MediaSize.Medium) {
      bodyWrapper['grid-template-columns'] = '1fr 12fr 1fr';
    } else if (mediaSize === MediaSize.Small) {
      bodyWrapper['grid-template-columns'] = '0px 1fr 0px';
    }
    return bodyWrapper;
  }
}
