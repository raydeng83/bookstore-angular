import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Book} from '../../models/book';
import {Router} from "@angular/router";
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../models/cart-item';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private selectedBook: Book;
  private cartItemList: CartItem[] = [];

  constructor(private router:Router, private cartService: CartService) { }

  onSelect(book:Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(
        res=>{
          console.log(res.json());
          this.cartItemList = res.json();
        },
        error=>{
          console.log(error.text());
        }
      );
  }

}
