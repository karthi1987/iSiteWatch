import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AppDefaults } from '../../defaultvalue';
import { Output } from '@angular/core/src/metadata/directives';

import * as AWS from 'aws-sdk';
AWS.config.update({
    region: AppDefaults.REGION,
    credentials: new AWS.Credentials(AppDefaults.ACCESS_KEY_ID, AppDefaults.SECRET_KEY)
});

const dynamodb = new AWS.DynamoDB();

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(public router: Router) {}

    username: string;
    userpass: string;

    ngOnInit() {}

    onLoggedin() {

        console.log(this.username);
        console.log(this.userpass);

        const params = {
            AttributesToGet: [
                'cust_pass'
            ],
            TableName : 'hwcustomer',
            Key : {
                'cust_login' : {
                    'S' : this.username
                }
            }
        };

        const passValue = this.userpass;
        const userValue = this.username;
        dynamodb.getItem(params, function(err, data) {
            if (err) {
                console.log(err); // an error occurred
            } else {
                if (data.Item === null || data.Item === undefined || data.Item.cust_pass === undefined) {
                    console.log('Bad password or user name');
                } else {
                    if (passValue === data.Item.cust_pass.S) {
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('userName', userValue);
                    } else {
                        console.log('Bad user name or password');
                    }
                }
            }
        });
    }
}
