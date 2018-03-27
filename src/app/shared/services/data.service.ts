import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getAuthentication() {

  }

  getSites(data) {
      return this.http.post(environment.getProjectSitesUrl,
          {
              user_login: data.userLogin,
              user_token: data.userToken,
              customer_id: data.customerID,
              site_id: data.siteId
          }
      );
  }

  getSiteLocations() {

  }

}
