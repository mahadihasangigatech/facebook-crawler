import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {FacebookCrawlApiService} from '../../services/api/facebook-crawl-api.service';
import {FileDownloadService} from '../../services/file-dowload/file-download.service';

@Component({
  selector: 'app-facebook-crawler',
  templateUrl: './facebook-crawler.component.html',
  styleUrls: ['./facebook-crawler.component.css']
})
export class FacebookCrawlerComponent implements OnInit {
  @ViewChild('range') rangePicker: any;
  isDownActive = true;
  minDate: Date;
  maxDate: Date;
  startDatePicker = null;
  endDatePicker = null;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  selectedType: any;
  selectedDomain: any;

  facebookForm: FormGroup;
  requestId: any;
  responseData: any;
  isTableShow = false;
  isLoading = false;
  isEnableProcessingButton = false;
  isStopCrawl = false;
  processedData: any;
  isProcessComplete = false;
  graphData: any = [];
  isHideStopCrawlButton = false;
  isEnableDownloadButton = false;

  constructor(private fb: FormBuilder, public datePipe: DatePipe,
              private apiService: FacebookCrawlApiService,
              private fileDownloadService: FileDownloadService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 10, currentMonth, 5);
    this.maxDate = new Date();
  }

  createFacebookForm(): void {
    this.facebookForm = this.fb.group({
      crawlingType: ['', Validators.required],
      crawlerDomain: ['', Validators.required],
      pageId: ['', Validators.required],
      pageLimit: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.createFacebookForm();
  }
  selectType(event: any): void{
    console.log(event.value);
    this.selectedType = event.value;
  }
  selectDomain(event: any): void{
    console.log(event);
    this.selectedDomain = event.value;
  }

  classifyAndCrawling(): void{
    this.isLoading = true;
    this.isHideStopCrawlButton = true;
    this.isEnableDownloadButton = false;
    let responseFromInterval: any;
    const params = {
      startDate: this.datePipe.transform(this.range.value.start, 'YYYY/MM/dd'),
      endDate: this.datePipe.transform(this.range.value.end, 'YYYY/MM/dd'),
      pageId: this.facebookForm.value.pageId,
      crawlerType: this.selectedType,
      crawler: this.selectedDomain
    };

    this.apiService.crawlFacebook(params)
      .subscribe((response: any) => {
        this.requestId = response.requestId;
        responseFromInterval = setInterval(() => {
          if (!this.responseData) {
            this.apiService.facebookCrawlGetRequest(this.requestId)
              .subscribe((data: any) => {
                if (data[0]?.analysis) {
                  this.responseData = data;
                  this.isTableShow = true;
                  this.isLoading = this.responseData ? false : true;
                  this.isEnableProcessingButton = this.responseData ? true : false;
                  if (this.responseData) {
                    this.apiService.getGraphData(this.responseData)
                      .subscribe((graphData: any) => {
                        this.graphData = graphData;
                      }, (graphError: any) => {
                        console.log('graph Error', graphError);

                      });
                  }
                }
              }, (error: any) => {
                console.log(error);
              });
          }else {
            this.apiService.crawlProcessing(response.requestId)
              .subscribe((processingData: any) => {
                if (this.isStopCrawl) {
                  clearInterval(responseFromInterval);
                }
                this.processedData = processingData.data;
                if (processingData.isCompleted) {
                  clearInterval(responseFromInterval);
                  this.isHideStopCrawlButton = false;
                  this.isEnableDownloadButton = true;
                  // this.isHideStopCrawlButton = false;
                  // this.isCrawlingButtonDisable = false;
                  this.isEnableProcessingButton = false;
                  // this.isEnableDownloadButton = true;
                  this.isProcessComplete = processingData.isCompleted ? true : false;
                  this.apiService.getGraphData(this.processedData)
                    .subscribe((graphData: any) => {
                      this.graphData = graphData;
                    }, (graphError: any) => {
                      console.log('graph Error', graphError);

                    });
                }
              }, (processingError: any) => {
                clearInterval(responseFromInterval);
                this.isLoading = false;
              });
          }
        }, 3000);
      }, (error: any) => {
        console.log(error);
      });
  }

  showCalender(): void{
    this.maxDate = new Date();
    this.startDatePicker = null;
    this.endDatePicker = null;
  }
  addDateRange(event: any): void {
    console.log(event);
    this.maxDate = new Date();
    const startDate = this.range.value.start;
    const today = new Date();
    if (this.range.value.end != null) {
      console.log('');
    }
    if (today > new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) {
      const selectedDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      const diffTime: any = Math.abs(today.valueOf() - selectedDate.valueOf());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.maxDate = (diffDays >= 6) ? (new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6)) :
        (new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + diffDays - 1));
    }
  }

  showGraph(): void{
    this.isDownActive = !this.isDownActive;
  }

  stopCrawling(): void{
    this.isStopCrawl = true;
    if (this.processedData){
      this.apiService.getGraphData(this.processedData)
        .subscribe((graphData: any) => {
          this.graphData = graphData;
        }, (graphError: any) => {
          console.log('graph Error', graphError);

        });
    }
    this.isEnableDownloadButton = this.responseData ? true : false;
    this.isHideStopCrawlButton = false;
    this.isEnableProcessingButton = false;
    this.apiService.stopCrawling(this.requestId)
      .subscribe((response: any) => {
        if (response) {
          this.isHideStopCrawlButton = false;
          this.isEnableProcessingButton = false;
        }
        // this.isShowStopCrawl = false;
      }, (error: any) => {
        console.log('error', error);

      });
  }

  download(): void{
    const data = {
      apiType: 'domainLink',
      data: this.processedData
    };
    this.fileDownloadService.downloadFile(data, 'jsontocsv');
  }

  dateFormate(date: any) {
    return this.datePipe.transform(date, 'dd/MM/YYYY');
  }


}
