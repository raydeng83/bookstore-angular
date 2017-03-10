import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AppConst} from '../constants/app-const';

@Injectable()
export class CartService {

  constructor(private http: Http) { }

  addItem(id:number, qty:number) {
    let url = AppConst.serverPath+"/cart/add";
    let cartItemInfo = {
    	"bookId" : id,
    	"qty" : qty
    }
    let tokenHeader = new Headers ({
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, cartItemInfo, {headers : tokenHeader});
  }

}
