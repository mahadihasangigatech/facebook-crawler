import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {
  chartType: any = 'line';
  screenWidth: any;
  @ViewChild(BaseChartDirective) chart: any;

  @Input() graphDetails: any = [];

  dateArray: any = [];
  polarityArray: any = [];
  topicArray: any = [];

  public chartDatasets: Array<any> = [
    // { data: [-0.95, -0.71, -0.25, -0.1, 0.33, 0.39, 0.57], label: 'First dataset' },
    // { data: [0, -0.1, -0.66, 0, 0.05, -0.01, -0.052], label: 'Second dataset' },
    // { data: [-1, -0.33, -0.66, 0, 0.05, -0.01, -0.052], label: 'Second dataset' }
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    // maintainAspectRatio: true,
    elements: {
      point:
        {
          radius: 5,
          // hitRadius: 1,
          // hoverRadius: 10,
          // hoverBorderWidth: 5
        }
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Time -->',
            fontColor: 'red'
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Polarity -->',
            fontColor: 'green',
            position: 'left',
          },
          ticks: {
            steps : 10,
            stepValue : 0.2,
            max : 1,
            min: -1
            // callback: (value: any ) => value % 0.2 ? null : value
          }
        },
      ]
    },
    tooltips: {
      callbacks: {
        title: (tooltipItem: any, data: any) =>  null,
        // label: (tooltipItem: any, data: any) => {
        //   console.log(tooltipItem, '=> ', data);
        //   // const label = [
        //   //   'X: ' + tooltipItem.xLabel
        //   // ];
        //   // return title;
        // }
      }
    }
  };
  @HostListener('window:resize', ['$event'])
  onResize(event?: any): any {
    this.screenWidth = window.innerWidth;
  }
  constructor() {
    this.onResize();
  }

  ngOnChanges(): void {
    this.chartDatasets = [];
    this.polarityArray = [];
    this.topicArray = [];

    console.log('this.graphDetails', this.graphDetails);
    // for (const item in this.graphDetails){
    //   this.dateArray = this.graphDetails[0].time;
    //   this.polarityArray.push(this.graphDetails[item].polarity);
    //   this.topicArray.push(this.graphDetails[item].topic);
    //   this.chartDatasets.push({
    //     data: this.polarityArray[item],
    //     label: this.topicArray[item]
    //   });
    // }
    this.chartDatasets = this.graphDetails[0];
    // this.chartLabels = this.dateArray;
    this.chartLabels = this.graphDetails[1];
  }

  ngOnInit(): void {
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void {
    // console.log('point hover', e);
  }

  hideOne(): any{
    console.log(this.polarityArray);
    for (const i in this.graphDetails[0]){
      const isHidden = this.chart.isDatasetHidden(i);
      this.chart.hideDataset(i, !isHidden);
    }
  }

}
