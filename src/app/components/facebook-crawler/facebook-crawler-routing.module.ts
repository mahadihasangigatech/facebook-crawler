import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FacebookCrawlerComponent} from './facebook-crawler.component';

const routes: Routes = [
  {path: '', component: FacebookCrawlerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacebookCrawlerRoutingModule { }
