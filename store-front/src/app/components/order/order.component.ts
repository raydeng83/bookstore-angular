import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Book} from '../../models/book';
import {Router} from "@angular/router";
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';
import {ShippingAddress} from '../../models/shipping-address';
import {BillingAddress} from '../../models/billing-address';
import {UserPayment} from '../../models/user-payment';
import {UserBilling} from '../../models/user-billing';
import {UserShipping} from '../../models/user-shipping';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private selectedBook: Book;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated:boolean;
  private shippingAddress:ShippingAddress=new ShippingAddress();
  private billingAddress:BillingAddress = new BillingAddress();
  private userPayment:UserPayment = new UserPayment();
  private userShipping:UserShipping = new UserShipping();
  private userBilling: UserBilling = new UserBilling();

  constructor(private router:Router, private cartService: CartService) { }

  onSelect(book:Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
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
