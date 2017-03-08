import { Injectable } from '@angular/core';
import {AppConst} from '../constants/app-const';
import {Http, Headers} from '@angular/http';

@Injectable()
export class PaymentService {
  private serverPath:string = AppConst.serverPath;
  
  constructor(private http:Http) { }

  getUserPaymentlist() {

  }
}