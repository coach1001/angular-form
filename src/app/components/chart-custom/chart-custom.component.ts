import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType, ChartScales } from 'chart.js';

@Component({
  selector: 'app-chart-custom',
  templateUrl: './chart-custom.component.html',
  styleUrls: ['./chart-custom.component.scss']
})
export class ChartCustomComponent implements OnInit {

  public startTime;

  public chartScale: ChartScales = {
    type: 'linear',
    display: true
  }

  public scatterChartOptions: ChartOptions = {
    responsive: true,
    scales: {
    }
  };

  public scatterChartData: ChartDataSets[] = [
    {
      data: [        
      ],
      label: 'Series A',
      pointRadius: 5,
    },
  ];
  public scatterChartType: ChartType = 'scatter';

  constructor() { }

  ngOnInit() {
    this.startTime = new Date();
    setInterval(_ => {
      const lapsedTime = (new Date().getTime() - this.startTime.getTime())/1000;
      // this.scatterChartData[0].data.push(lapsedTime, Math.sin(lapsedTime));
    }, 50)
  }
}
