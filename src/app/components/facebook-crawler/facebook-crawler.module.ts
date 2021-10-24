import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { FacebookCrawlerRoutingModule } from './facebook-crawler-routing.module';
import { FacebookCrawlerComponent } from './facebook-crawler.component';
import {LineGraphModule} from '../shared/graph/line-graph/line-graph.module';

import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [FacebookCrawlerComponent],
  imports: [
    CommonModule,
    FacebookCrawlerRoutingModule,
    LineGraphModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,

  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    },
    DatePipe,
  ],
})
export class FacebookCrawlerModule { }
