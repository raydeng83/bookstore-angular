import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Book} from '../../models/book';
import {Router} from "@angular/router";
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private selectedBook: Book;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();

  constructor(private router:Router, private cartService: CartService) { }

  onSelect(book:Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe(
        res=>{
          console.log(res.text());
          this.getCartItemList();
        },
        error=>{
          console.log(error.text());
        }
      );
  }

  getCartItemList(){
    this.cartService.getCartItemList().subscribe(
        res=>{
          this.cartItemList = res.json();
          this.cartItemNumber = this.cartItemList.length;
        },
        error=>{
          console.log(error.text());
        }
      );
  }

  ngOnInit() {
    this.getCartItemList();
    

    this.cartService.getShoppingCart().subscribe(
      res=>{
          console.log(res.json());
          this.shoppingCart=res.json();
        },
        error=>{
          console.log(error.text());
        }
    );
  }

}
