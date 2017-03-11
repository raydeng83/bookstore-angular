import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AppConst} from '../constants/app-const';
import {ShippingAddress} from '../models/shipping-address';
import {BillingAddress} from '../models/billing-address';
import {Payment} from '../models/payment';

@Injectable()
export class CheckoutService {

  constructor(private http: Http) { }

  checkout(
  		shippingAddress:ShippingAddress,
  		billingAddress:BillingAddress,
  		payment:Payment,
  		shippingMethod:string
  	) {
    let url = AppConst.serverPath+"/checkout/checkout";
    let order = {
    	"shippingAddress" : shippingAddress,
    	"billingAddress" : billingAddress,
    	"payment" : payment,
    	"shippingMethod" : shippingMethod
    }
    let tokenHeader = new Headers ({
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, order, {headers : tokenHeader});
  }

  getUserOrder() {
    let url = AppConst.serverPath+"/checkout/getUserOrder";
    
    let tokenHeader = new Headers ({
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers : tokenHeader});
  }

}
