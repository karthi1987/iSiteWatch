import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';

//Image Gallery Slideshow
import { NgxGalleryModule } from 'ngx-gallery';

import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        ZoneRoutingModule,
        FormsModule,
        StatModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxGalleryModule
    ],
    declarations: [
        ZoneComponent
    ]
})
export class ZoneModule {}
