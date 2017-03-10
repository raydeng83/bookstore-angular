import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Book} from '../../models/book';
import {Router} from "@angular/router";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private selectedBook: Book;

  constructor(private router:Router) { }

  onSelect(book:Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  ngOnInit() {
  }

}
