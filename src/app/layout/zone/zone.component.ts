import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx'

import * as _ from 'lodash';
import * as moment from 'moment';

//import Moment from 'moment';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Image gallery slideshow
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
  providers: [NgbCarouselConfig],
  animations: [routerTransition()]
})
export class ZoneComponent implements OnInit {

	images: Array<string>;
	galleryOptions: NgxGalleryOptions[];
	galleryImages: NgxGalleryImage[];
  galleryResults: Array<Object> = [];
	thumbnailDates: Array<Object> = [];
	setDate;
	minDate;
	maxDate;
	selectedDate;
	secondDate;
	thirdDate;
	fourthDate;
	fifthDate;
	sixthDate;
  testValue;
  selectedObject;

  constructor(public router: Router, public config: NgbCarouselConfig, private _http: HttpClient ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;

  }

  getUserCredentials() {
    //sessionStorage('getItem', userDetails);
  }

  setDateByUserSelect( date ) {
    this.selectedDate = date;
    this.testValue = date;
    for( var key in  this.thumbnailDates ) {
      var tDate = new Date( this.thumbnailDates[ key ]['label'] ).getDate();
      var cDate = new Date( date ).getDate();
      if( tDate == cDate ) {
        this.selectedObject = this.thumbnailDates[ key ];
        this.thumbnailDates[ key ]['show'] = false;
      } else {
         this.thumbnailDates[ key ]['show'] = true;
      }
    }
    return this.selectedObject;
  }

  setImageGalleryViewByDate( item ) {
    if ( item ) {
      this.selectedDate = item.label;

    for( var key in  this.thumbnailDates ) {
      var tDate = new Date( this.thumbnailDates[ key ]['label'] ).getDate();
      var cDate = new Date( item.label ).getDate();
      if( tDate == cDate ) {
        this.selectedObject = this.thumbnailDates[ key ];
        this.thumbnailDates[ key ]['show'] = false;
      } else {
         this.thumbnailDates[ key ]['show'] = true;
      }
    }

    }
    return this.selectedObject;
  }

  ngOnInit() {
  	console.log('Calling ngOnInit for Zone');

		var days = 6; // Days you want to subtract
		var date = new Date();
		var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
		var day = last.getDate();
		var month = last.getMonth() + 1;
		var year = last.getFullYear();

		this.setDate = month+'/'+day+'/'+year;

		//End date before 7days from Today
		this.minDate = new Date(year, new Date().getMonth(), day);

		//Starting date Today
		this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

		this.secondDate = new Date( this.minDate );
		this.secondDate.setDate(this.secondDate.getDate() + 1);

		this.thirdDate = new Date( this.secondDate );
		this.thirdDate.setDate(this.thirdDate.getDate() + 1);

		this.fourthDate = new Date( this.thirdDate );
		this.fourthDate.setDate(this.fourthDate.getDate() + 1);

		this.fifthDate = new Date( this.fourthDate );
		this.fifthDate.setDate(this.fifthDate.getDate() + 1);

		this.sixthDate = new Date( this.fifthDate );
		this.sixthDate.setDate(this.sixthDate.getDate() + 1);

		this.thumbnailDates.push(
      { 'key': 'firstSlot', 'label': this.minDate, 'dateFormat':  moment.utc(this.minDate).format(), 'show': true, 'galleryImages': {} }, 
      { 'key': 'secondSlot', 'label': this.secondDate, 'dateFormat': moment.utc(this.secondDate).format(), 'show': true, 'galleryImages': {} }, 
      { 'key': 'thirdSlot', 'label': this.thirdDate, 'dateFormat': moment.utc(this.thirdDate).format(), 'show': true, 'galleryImages': {} }, 
      { 'key': 'fourthSlot', 'label': this.fourthDate, 'dateFormat': moment.utc(this.fourthDate).format(), 'show': true, 'galleryImages': {} },
      { 'key': 'fifthSlot', 'label': this.fifthDate, 'dateFormat': moment.utc(this.fifthDate).format(), 'show': true, 'galleryImages': {} }, 
      { 'key': 'sixthSlot', 'label': this.sixthDate, 'dateFormat': moment.utc(this.sixthDate).format(), 'show': false, 'galleryImages': {} },
      { 'key': 'seventhSlot', 'label': this.maxDate, 'dateFormat': moment.utc(this.maxDate).format(), 'show': true, 'galleryImages': {} }
    );

    this.selectedObject = this.thumbnailDates[5];
    this.selectedDate = this.selectedObject.label;

		/* Responsive Design */
    this.galleryOptions = [
        {
            width: '900px',
            height: '600px',
            thumbnailsColumns: 4,
            preview: false,
            imageArrows: false,
            imageAnimation: NgxGalleryAnimation.Slide
        },
        {
            breakpoint: 800,
            width: '100%',
            height: '600px',
            imagePercent: 80,
            imageArrows: false,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
        },
        {
            breakpoint: 400,
            preview: false
        }
    ];

    const ZoneHttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const ZoneHttpUrl = "https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/image-history";
    const userCredentials = JSON.parse(sessionStorage.getItem('userDetails'));
    const fromDate = year+'-'+month+'-'+day;
    const toDate = this.maxDate.getFullYear()+'-'+ month +'-'+this.maxDate.getDate();
    const ZonePayLoad = JSON.stringify(
        {
           "customer_id": userCredentials['customer_id'],
           "device_id": "B827EB4E52F9",
           "from": fromDate,
           "location_adminstatus": "Up",
           "location_humidity": 53.31,
           "location_id": "7777964567972",
           "location_last_pic_time": 1521915146,
           "location_last_pir_time": 0,
           "location_lastupdate": 1521915193804,
           "location_location": "44.781207,-93.171535",
           "location_name": "West Backyard",
           "location_operstatus": "Connected",
           "location_temperature": 36.98,
           "site_id": userCredentials['site_id'],
           "to": toDate,
           "user_login": userCredentials['user_login'],
           "user_token": userCredentials['user_token']
        }
    );

    return this._http.post(ZoneHttpUrl, ZonePayLoad, ZoneHttpOptions).subscribe(
      results => {
        const zoneResults = results;
         if( zoneResults['errorMessage'] &&  zoneResults['errorMessage'] == "TOKEN_EXPIRED" ) {
           return false;
         }
        var result = _.chain(zoneResults['data'])
          .groupBy("yyyy_mm_dd")
          .toPairs()
          .map(function (currentItem) {
              return _.fromPairs(_.zip(["yyyy_mm_dd", "image"], currentItem));
          })
          .value();
         this.galleryResults = result;

         const tDates = _.map(this.thumbnailDates, function(item, index ){
          var localTime = moment(item['dateFormat']).format('YYYY-MM-DD'); // store localTime
          var proposedDate = localTime + "T00:00:00.000Z";
           const tD = moment(item['dateFormat']).format('D');
           const imageGallery = _.filter(result, function(o) { 
             if( proposedDate == o.yyyy_mm_dd ) {
                 let galleyCustomizedImages = [];
                galleyCustomizedImages = _.map(o.image, function(i, ix){
                   const cImages = {};
                   cImages['small'] = i['image'];
                   cImages['medium'] = i['image'];
                   cImages['big'] = i['image'];
                   galleyCustomizedImages.push( cImages );
                   return cImages;
                 })
               return item['galleryImages'] = galleyCustomizedImages;
             }
           });
           return item;
         });
         this.thumbnailDates = tDates;
         return result;
       },
       error => {
         console.error("Error saving food!");
         //return Observable.throw(error);
       }
    );

}

}
