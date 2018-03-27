import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MenuConfig } from '../../../config/menu.config';
import * as $ from 'jquery';
import {DataService} from "../../shared/services/data.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public options: any = new MenuConfig();

    selectedSiteId;
    projectName;
    sites = [];
    locations;
    userData;

    getProjectSites() {
        this.dataService.getSites(this.userData)
            .subscribe(
                (results:any) => {
                this.sites = results.data;
                },
                error => console.error("Fetching details of project sites failed"));
    }

    getSiteLocations() {
        this.userData.siteId = this.selectedSiteId;
        this.dataService.getLocations(this.userData)
            .subscribe(
                (results:any) => {
                this.locations = results.data;
                },
                error => console.error("Fetching details of site locations failed"));
    }

    constructor(private dataService: DataService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    /* BoxWidget
    * =========
    * BoxWidget is a plugin to handle collapsing and
    * removing boxes from the screen.
    *
    * @type Object
    * @usagethis.boxWidget.activate()
    *        Set all your options in the mainthis.options object
    */
    public boxWidget: any = {
        selectors: this.options.boxWidgetOptions.boxWidgetSelectors,
        icons: this.options.boxWidgetOptions.boxWidgetIcons,
        animationSpeed: this.options.animationSpeed,
        activate: function (_box: any) {
            var _this = this;
            if (!_box) {
                _box = document; // activate all boxes per default
            }
            //Listen for collapse event triggers
            $(_box).on('click', _this.selectors.collapse, function (e) {
                e.preventDefault();
                _this.collapse($(this));
            });

            //Listen for remove event triggers
            $(_box).on('click', _this.selectors.remove, function (e) {
                e.preventDefault();
                _this.remove($(this));
            });
        },
        collapse: function (element: any) {
            var _this = this;
            //Find the box parent
            var box = element.parents(".box").first();
            //Find the body and the footer
            var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
            if (!box.hasClass("collapsed-box")) {
                //Convert minus into plus
                element.children(":first")
                    .removeClass(_this.icons.collapse)
                    .addClass(_this.icons.open);
                //Hide the content
                box_content.slideUp(_this.animationSpeed, function () {
                    box.addClass("collapsed-box");
                });
            } else {
                //Convert plus into minus
                element.children(":first")
                    .removeClass(_this.icons.open)
                    .addClass(_this.icons.collapse);
                //Show the content
                box_content.slideDown(_this.animationSpeed, function () {
                    box.removeClass("collapsed-box");
                });
            }
        },
        remove: function (element: any) {
            //Find the box parent
            var box = element.parents(".box").first();
            box.slideUp(this.animationSpeed);
        }
    };

    ngOnInit() {

        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        this.projectName = userDetails.customer.customer_busname;
        this.userData = {
            userLogin: userDetails.user_login,
            userToken: userDetails.user_token,
            customerID: userDetails.customer_id,
            siteId: userDetails.site_id
        };

        this.getProjectSites();

        /*this.dataService.getSites(this.userData)
            .subscribe((data:any) => {
                console.log(data);
                this.sites = data;
            });*/

        //
        // userDetails.isDefaultViewSet()

        // defaults = dataService.getDefaultViewDetails(username);

        // projects = dataService.getProjects(username);
        // sites = dataService.getSites(username, projects[0]);



        // Easy access to options
        var o = this.options;

        // Activate box widget
        if (o.enableBoxWidget) {
            this.boxWidget.activate();
        }

        /*$('.widget-user-header').click(function() {
            //this.window.location = $(this).find('a').attr('href');
            return false;
        });*/
        /*
                });
        /*
                //Activate direct chat widget
                if (o.directChat.enable) {
                    $(document).on('click', o.directChat.contactToggleSelector, function () {
                        var box = $(this).parents('.direct-chat').first();
                        box.toggleClass('direct-chat-contacts-open');
                    });
                }

                // INITIALIZE BUTTON TOGGLE
                $('.btn-group[data-toggle="btn-toggle"]').each(function () {
                    var group = $(this);
                    $(this).find(".btn").on('click', function (e) {
                        group.find(".btn.active").removeClass("active");
                        $(this).addClass("active");
                        e.preventDefault();
                    });

                });
        */
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    navigateToZone(location) {
        const locationDetails = {
            device_id: location.device_id,
            location_id: location.location_id,
            location_name: location.location_name
        };

        if( sessionStorage ) {
            sessionStorage.setItem('locationDetails', JSON.stringify( locationDetails ));
            return false;
        }

    }
}
