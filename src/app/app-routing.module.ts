import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FacebookCrawlerModule} from './components/facebook-crawler/facebook-crawler.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'crawler',
    pathMatch: 'full'

  },
  {
    path: 'crawler',
    // loadChildren: './components/facebook-crawler/facebook-crawler.module#FacebookCrawlerModule'
    loadChildren: () => import('./components/facebook-crawler/facebook-crawler-routing.module')
      .then( m => m.FacebookCrawlerRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
