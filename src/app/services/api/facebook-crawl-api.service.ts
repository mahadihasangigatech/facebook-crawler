import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_ENDPOINT} from '../constant';

@Injectable({
  providedIn: 'root'
})
export class FacebookCrawlApiService {

  API_BASE_URL: string;
  headers = new HttpHeaders({
    'content-type': 'application/json', Accept: '*/*'
  });
  options = {
    headers: this.headers
  };

  constructor(private http: HttpClient) {
    this.API_BASE_URL = API_ENDPOINT;
  }

  crawlFacebook(params: any): any{
    const body = {
      startDate: params.startDate,
      endDate: params.endDate,
      pageId: params.pageId,
      crawler: params.crawler,
      crawlerType: params.crawlerType
    };
    return this.http.post(this.API_BASE_URL + 'api/v.0/sentiments/domainlinks', body);
  }

  facebookCrawlGetRequest(rId: any){
    return this.http.get(this.API_BASE_URL + 'api/v.0/sentiments/domainlinks?rId=' + rId + '&dataLimit=' + 5);
  }

  crawlProcessing(rId: any){
    return this.http.get(this.API_BASE_URL + 'api/v.0/sentiments/links?rId=' + rId);
  }

  getGraphData(crawlingResponse: any){
    const body = {
      responseData: crawlingResponse
    };
    return this.http.post(this.API_BASE_URL + 'api/v.0/sentiments/graphs', body);
  }

  stopCrawling(rId: any){
    const body = {
      requestId: rId
    };
    return this.http.put(this.API_BASE_URL + 'api/v.0/sentiments/domainlinks', body);
  }
}
