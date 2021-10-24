import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookCrawlerComponent } from './facebook-crawler.component';

describe('FacebookCrawlerComponent', () => {
  let component: FacebookCrawlerComponent;
  let fixture: ComponentFixture<FacebookCrawlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookCrawlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookCrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
