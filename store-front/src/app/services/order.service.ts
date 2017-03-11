import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AppConst} from '../constants/app-const';
import {Order} from '../models/order';

@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  getOrderList () {
  	let url = AppConst.serverPath+"/order/getOrderList";
    
    let tokenHeader = new Headers ({
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers : tokenHeader});
  }
}
