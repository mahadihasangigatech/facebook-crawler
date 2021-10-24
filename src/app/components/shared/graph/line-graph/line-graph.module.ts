import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineGraphRoutingModule } from './line-graph-routing.module';
import { LineGraphComponent } from './line-graph.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [LineGraphComponent],
  exports: [
    LineGraphComponent
  ],
  imports: [
    CommonModule,
    LineGraphRoutingModule,
    ChartsModule
  ]
})
export class LineGraphModule { }
