import { Component, OnInit, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

//import Moment from 'moment';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

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

  constructor(public router: Router, public config: NgbCarouselConfig, private _http: HttpClient ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;

  }

  setDateByUserSelect( date ) {
    this.selectedDate = date;

    this.testValue = date;

   // console.log( this.selectedDate, "setDateByUserSelect" );
   // debugger;
    return false;
  }

  setImageGalleryViewByDate( item ) {
    if ( item ) {
      this.selectedDate = item.label;
    }
    return false;
  }

  ngOnInit() {
  	console.log('Calling ngOnInit for Zone');
  	    /*this._http.get('https://picsum.photos/list')
        .pipe(map((images: Array<{id: number}>) => this._randomImageUrls(images)))
        .subscribe(images => this.images = images);*/

		var days = 6; // Days you want to subtract
		var date = new Date();
		var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
		var day=last.getDate();
		var month=last.getMonth()+1;
		var year=last.getFullYear();

		this.setDate = month+'/'+day+'/'+year;

		new Date().getFullYear()
		new Date().getMonth();
		new Date().getDate();

		//End date before 7days from Today
		this.minDate = new Date(year, new Date().getMonth(), day);

		//Starting date Today
		this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

		this.selectedDate = this.maxDate;

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


		/*this.thumbnailDates.push(
      { 'key': 'firstSlot', 'label': this.minDate, 'dateFormat':  Moment(this.minDate).format( "MM/DD/YYYY" ) }, 
      { 'key': 'secondSlot', 'label': this.secondDate, 'dateFormat': Moment(this.secondDate).format( "MM/DD/YYYY" ) }, 
      { 'key': 'thirdSlot', 'label': this.thirdDate, 'dateFormat': Moment(this.thirdDate).format( "MM/DD/YYYY" ) }, 
      { 'key': 'fourthSlot', 'label': this.fourthDate, 'dateFormat': Moment(this.fourthDate).format( "MM/DD/YYYY" ) },
      { 'key': 'fifthSlot', 'label': this.fifthDate, 'dateFormat': Moment(this.fifthDate).format( "MM/DD/YYYY" ) }, 
      { 'key': 'sixthSlot', 'label': this.sixthDate, 'dateFormat': Moment(this.sixthDate).format( "MM/DD/YYYY" ) },
      { 'key': 'seventhSlot', 'label': this.maxDate, 'dateFormat': Moment(this.maxDate).format( "MM/DD/YYYY" ) }
    );*/


    this.thumbnailDates.push(
      { 'key': 'firstSlot', 'label': this.minDate  }, 
      { 'key': 'secondSlot', 'label': this.secondDate }, 
      { 'key': 'thirdSlot', 'label': this.thirdDate }, 
      { 'key': 'fourthSlot', 'label': this.fourthDate },
      { 'key': 'fifthSlot', 'label': this.fifthDate }, 
      { 'key': 'sixthSlot', 'label': this.sixthDate },
      { 'key': 'seventhSlot', 'label': this.maxDate }
    );


		//To do: Find 6 days between
		/* Responsive Design */
        this.galleryOptions = [
            {
                width: '800px',
                height: '600px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            {
                breakpoint: 400,
                preview: false
            }
        ];


        this.galleryImages = [
            {
                small: 'https://picsum.photos/900/500?image=234',
                medium: 'https://picsum.photos/900/500?image=234',
                big: 'https://picsum.photos/900/500?image=234'
            },
            {
                small: 'https://picsum.photos/900/500?image=235',
                medium: 'https://picsum.photos/900/500?image=235',
                big: 'https://picsum.photos/900/500?image=235'
            },
            {
                small: 'https://picsum.photos/900/500?image=236',
                medium: 'https://picsum.photos/900/500?image=236',
                big: 'https://picsum.photos/900/500?image=236'
            },
            {
                small: 'https://picsum.photos/900/500?image=237',
                medium: 'https://picsum.photos/900/500?image=237',
                big: 'https://picsum.photos/900/500?image=237'
            },
            {
                small: 'https://picsum.photos/900/500?image=238',
                medium: 'https://picsum.photos/900/500?image=238',
                big: 'https://picsum.photos/900/500?image=238'
            },
            {
                small: 'https://picsum.photos/900/500?image=239',
                medium: 'https://picsum.photos/900/500?image=239',
                big: 'https://picsum.photos/900/500?image=239'
            }
        ];

  }

private _randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
}


}
