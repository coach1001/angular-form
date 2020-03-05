import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart-custom',
  templateUrl: './chart-custom.component.html',
  styleUrls: ['./chart-custom.component.scss']
})
export class ChartCustomComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'line'
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
  constructor() { }

  ngOnInit() {
  }
}
