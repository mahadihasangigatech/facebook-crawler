import { Injectable } from '@angular/core';
import * as json2csv from 'json2csv';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private datePipe: DatePipe) { }


  getNestedValue(object: any, keys: any) {
    let pointer: any = object;
    for (const key of keys) {
      if (key in pointer) {
        pointer = pointer[key];
      } else {
        return '';
      }
    }
    return pointer;
  }
  topicIteration(data: any, keys: any): any{
    let topics: any = [];
    for (let i = 0; i < data.length; i++){
      topics.push(data[i].topicName);
    }
    return topics.join();
  }

  downloadFile(data: any, filename= 'data') {
    const jsonDataArray: any = [];
    let csvData: any;
    for (const item of data.data) {
        const row = {
          paragraph : item.text,
          message : this.getNestedValue(item, ['analysis', 'errorMessage']),
          topics :  this.topicIteration(item.analysis.topics, ['analysis', 'topics']),
          polarity_class : this.getNestedValue(item, ['analysis', 'polarity', 'class']),
          polarity_score : this.getNestedValue(item, ['analysis', 'polarity', 'score']),
          url: item.metaData.url,
          published_date : (item.metaData.publishedDate) ? this.datePipe.transform(item.metaData.publishedDate, 'dd/MM/YYYY') : '--',
          // classwise_score : this.getNestedValue(item, ['analysis', 'polarity', 'classwiseProbability']),
          // words : JSON.stringify(this.getNestedValue(item, ['text'])),
        };
        jsonDataArray.push(row);
      }
    csvData = json2csv.parse(
        jsonDataArray,
        {
          fields: [
            'paragraph',
            'message',
            'polarity_class',
            'polarity_score',
            // 'classwise_score',
            // 'words',
            'topics',
            'url',
            'published_date'
          ]
        }
      );

    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
}
