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

const dynamodb = new AWS.DynamoDB({ region: 'us-east-1' });

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

        //Test

        //usertest Covfefe0!
        /*dynamodb.listTables({ Limit: 10 }, function( error, data ){
            debugger;
        });*/

        const params = {
            AttributesToGet: [
                'user_pass', 'user_name', 'site_id', 'customer_id', 'user_token'
            ],
            TableName : 'user',
            Key : {
                'user_login' : {
                    'S' : this.username
                }
            }
        };

        /*
        https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/location

           var data = {
               "user_login": dc.user.user_login,
               "user_token": dc.user.user_token,
               "site_id": site.site_id,
               "customer_id": site.customer_id
           };
         */

// d6c7d20a-5e1b-4310-96c2-7da0c07a1737
        const passValue = this.userpass;
        const userValue = this.username;
        dynamodb.getItem(params, function(err, data) {

            if (err) {
                console.log(err); // an error occurred
            } else {
                console.log(data);
                if ( data &&  data.Item && data.Item.user_pass && data.Item.user_pass.S ) {
                    const userName = data.Item.user_name.S;
                    const siteId = data.Item.site_id.S;
                    const customerId = data.Item.customer_id.S;
                    const password = data.Item.user_pass.S;
                    const userToken = data.Item.user_token.S;

                    if ( passValue === data.Item.user_pass.S ) {
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('siteId', siteId);
                        localStorage.setItem('customerId', customerId);
                        localStorage.setItem('userName', userName);
                        localStorage.setItem('userToken', userToken);
                    } else {
                        console.log('Bad user name or password');
                    }
                } else {
                    console.log('Bad password or user name');
                }
            }
        });
    }
}
