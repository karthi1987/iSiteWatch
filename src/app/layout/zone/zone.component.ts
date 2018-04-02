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
  locationName;
  locations;
  events;
  loader;

  constructor(public router: Router, public config: NgbCarouselConfig, private _http: HttpClient ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;

  }

  getUserCredentials() {
    //sessionStorage('getItem', userDetails);
  }

  isObjectEmpty( card ){
     return Object.keys(card).length === 0;
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

    var enddate = moment().format("MM/DD/YYYY");
    var startdate = moment().subtract(6, "days").format("MM/DD/YYYY");
    var seconddate = moment(startdate).add('days', 1).format("MM/DD/YYYY");
    var thirddate = moment(seconddate).add('days', 1).format("MM/DD/YYYY");
    var fourthdate = moment(thirddate).add('days', 1).format("MM/DD/YYYY");
    var fifthdate = moment(fourthdate).add('days', 1).format("MM/DD/YYYY");
    var sixthdate = moment(fifthdate).add('days', 1).format("MM/DD/YYYY");

    //moment(startdate).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")

		//End date before 7days from Today
		this.minDate = new Date(startdate);
		//Starting date Today
		this.maxDate = new Date(enddate);
		this.secondDate = new Date(seconddate);
		this.thirdDate = new Date(thirddate);
		this.fourthDate = new Date(fourthdate);
		this.fifthDate = new Date(fifthdate);
		this.sixthDate = new Date(sixthdate);

		this.thumbnailDates.push(
      { 'key': 'firstSlot', 'label': this.minDate, 'dateFormat':  moment.utc(this.minDate).format(), 'show': true, 'galleryImages': {} }, 
      { 'key': 'secondSlot', 'label': this.secondDate, 'dateFormat': moment.utc(this.secondDate).format(), 'show': true, 'galleryImages': {} }, 
      { 'key': 'thirdSlot', 'label': this.thirdDate, 'dateFormat': moment.utc(this.thirdDate).format(), 'show': true, 'galleryImages': {} }, 
      { 'key': 'fourthSlot', 'label': this.fourthDate, 'dateFormat': moment.utc(this.fourthDate).format(), 'show': true, 'galleryImages': {} },
      { 'key': 'fifthSlot', 'label': this.fifthDate, 'dateFormat': moment.utc(this.fifthDate).format(), 'show': true, 'galleryImages': {} }, 
      { 'key': 'sixthSlot', 'label': this.sixthDate, 'dateFormat': moment.utc(this.sixthDate).format(), 'show': false, 'galleryImages': {} },
      { 'key': 'seventhSlot', 'label': this.maxDate, 'dateFormat': moment.utc(this.maxDate).format(), 'show': true, 'galleryImages': {} }
    );

    this.loader = false;
    this.selectedObject = this.thumbnailDates[5];
    this.selectedDate = this.selectedObject.label;

		/* Responsive Design */
    this.galleryOptions = [
        {
            width: '900px',
            height: '600px',
            thumbnailsColumns: 4,
            preview: true,
            imageArrows: false,
            imageAutoPlay: false,
            imageAutoPlayPauseOnHover: false, 
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
            width: '100%',
            preview: false
        }
    ];

    const ZoneHttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const ZoneHttpUrl = "https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/image-history";
    const userCredentials = JSON.parse(sessionStorage.getItem('userDetails'));
    const locationDetails = JSON.parse(sessionStorage.getItem('locationDetails'));
    const fromDate = moment( startdate ).format('YYYY-MM-DD');
    const toDate = moment( enddate ).format('YYYY-MM-DD');
    const ZonePayLoad = JSON.stringify(
        {
           "customer_id": userCredentials['customer_id'],
           "device_id": locationDetails['device_id'],
           "from": fromDate,
           "location_adminstatus": "Up",
           "location_humidity": 53.31,
           "location_id": locationDetails['location_id'],
           "location_name": locationDetails['location_name'],
           "site_id": userCredentials['site_id'],
           "to": toDate,
           "user_login": userCredentials['user_login'],
           "user_token": userCredentials['user_token']
        }
    );

    this.locationName = locationDetails['location_name'];
    this.locations = locationDetails;
    this.events = locationDetails['events'];

    /* Service call to get Site details */
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

         //debugger;

         const tDates = _.map(this.thumbnailDates, function(item, index ) {
          var localTime = moment(item['dateFormat']).format('YYYY-MM-DD'); // store localTime
          var proposedDate = localTime + "T00:00:00.000Z"; // convert the localTime to UTC format
           const tD = moment(item['dateFormat']).format('D');
           const imageGallery = _.filter(result, function(o) { 
             if( proposedDate == o.yyyy_mm_dd ) {
                let galleyCustomizedImages = [];
                galleyCustomizedImages = _.map(o.image, function(i, ix){
                   const cImages = {};
                   cImages['small'] = i['image'];
                   cImages['medium'] = i['image'];
                   cImages['big'] = i['image'];
                   cImages['description'] = 'Time: '+i['hhmm'];
                   galleyCustomizedImages.push( cImages );
                   return cImages;
                 })
               return item['galleryImages'] = galleyCustomizedImages;
             }
           });
           return item;
         });
         this.loader = true;
         this.thumbnailDates = tDates;
         return result;
       },
       error => {
         console.error("Error: Server failed! ");
         //return Observable.throw(error);
       }
    );
}

}
