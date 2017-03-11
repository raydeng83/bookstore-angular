import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AppConst} from '../constants/app-const';


@Injectable()
export class BookService {

  constructor(private http: Http) { }

  getBookList() {
    let url = AppConst.serverPath+"/book/bookList";
    let tokenHeader = new Headers ({
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers : tokenHeader});
  }

  getBook(id:number) {
    let url = AppConst.serverPath+"/book/"+id;
    let tokenHeader = new Headers ({
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, {headers : tokenHeader});
  }

  searchBook(keyword:string) {
    let url = AppConst.serverPath+"/book/searchBook";
    let tokenHeader = new Headers ({
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, keyword, {headers : tokenHeader});
  }

}
