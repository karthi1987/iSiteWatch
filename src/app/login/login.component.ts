import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AppDefaults } from '../../defaultvalue';
import { Output } from '@angular/core/src/metadata/directives';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as AWS from 'aws-sdk';
import * as $ from 'jquery';

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

    constructor(public router: Router, private _http: HttpClient) {}

    username: string;
    userpass: string;
    myform: FormGroup;
    user;

    ngOnInit() {
      this.user = { name: '', password: '', credentials: false, token: false };
    }

    onSignIn(regForm:NgForm){  
      
      if( regForm.submitted && regForm.valid ) {
        const userValue = this.user.name;
        const passValue = this.user.password;

        const ZoneHttpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        const ZoneHttpUrl = "https://wejllcr10k.execute-api.us-east-1.amazonaws.com/BETA/authenticate";
        const ZonePayLoad = JSON.stringify(
            {
            "user_login": userValue,
            "user_pass": passValue
            }
        );

        return this._http.post(ZoneHttpUrl, ZonePayLoad, ZoneHttpOptions).subscribe(
          results => {
            const loginResults = results;
              if( 
                loginResults['status'] 
                && loginResults['status']['message'] 
                && ( loginResults['status']['message'] == 'INVALID_USER' || loginResults['status']['message'] == 'INVALID_CREDENTIALS' ) ) {
                this.user.credentials = true;
                this.user.token = false;
                console.log('Login failed');
                return false;
                //this.router.navigate(['/login']);
              }

             if( 
               loginResults['errorMessage'] 
               && loginResults['errorMessage'] == "TOKEN_EXPIRED" ) {
               this.user.credentials = false;
               this.user.token = true;
                console.log('Login Token expired');
               return false;
             }

             if( !loginResults['data'] ) {
                 this.router.navigate(['/login']);
             }

             if( sessionStorage ) {
                this.user.credentials = false;
                this.user.token = false;
                sessionStorage.setItem('userDetails', JSON.stringify( loginResults['data'] ));
                this.router.navigate(['/dashboard']);
             }
           },
           error => {
             console.error("Error saving food!");
             //return Observable.throw(error);
           }
        );
      }
    }

    onLoggedin( event ) {

      //event.preventDefault();

        //Test

        //usertest Covfefe0!
        /*dynamodb.listTables({ Limit: 10 }, function( error, data ){
            debugger;
        });*/

        /*const params = {
            AttributesToGet: [
                'user_pass', 'user_name', 'site_id', 'customer_id'
            ],
            TableName : 'user',
            Key : {
                'user_login' : {
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

                if ( data &&  data.Item && data.Item.user_pass && data.Item.user_pass.S ) {
                    const userName = data.Item.user_name.S;
                    const siteId = data.Item.site_id.S;
                    const customerId = data.Item.customer_id.S;
                    const password = data.Item.user_pass.S;

                    if ( passValue === data.Item.user_pass.S ) {
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('siteId', siteId);
                        localStorage.setItem('customerId', customerId);
                        localStorage.setItem('userName', userName);
                    } else {
                        console.log('Bad user name or password');
                    }
                } else {
                    console.log('Bad password or user name');
                }
            }
        });
        */
    }
}
