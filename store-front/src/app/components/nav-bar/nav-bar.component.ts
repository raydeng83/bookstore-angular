import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router, NavigationExtras} from "@angular/router";
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private loggedIn = false;
  private keyword:string;
  private bookList:Book[] = [];

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private bookService:BookService
  ) { }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;
      }
    );
  }

  onSearchByTitle(){
    this.bookService.searchBook(this.keyword).subscribe(
      res => {
        this.bookList=res.json();

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "bookList": JSON.stringify(this.bookList)
            }
        };

        this.router.navigate(['/bookList'], navigationExtras);
      },
      error => {
        console.log(error);
      }
    );
  }

  logout(){
    this.loginService.logout().subscribe(
      res => {
        location.reload();
      },
      err => console.log(err)
    );
    // location.reload();
    this.router.navigate(['/']);
  }

}
