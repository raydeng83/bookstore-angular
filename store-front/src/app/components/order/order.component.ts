import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Book} from '../../models/book';
import {Router} from "@angular/router";
import {CartService} from '../../services/cart.service';
import {ShippingService} from '../../services/shipping.service';
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
  private userShippingList: UserShipping[] = [];
  private selectedTab: number;
  private emptyShippingList: boolean = true;
  private stateList: string[] = [];

  constructor(private router:Router, private cartService: CartService, private shippingService: ShippingService) { }

  onSelect(book:Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  selectedChange(val :number ){
    this.selectedTab=val;
  }

  goToPayment() {
  	this.selectedTab=1;
  }

  goToReview() {
  	this.selectedTab=2;
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

  setShippingAddress(userShipping: UserShipping) {
  	this.shippingAddress.shippingAddressName = userShipping.userShippingNmae;
  	this.shippingAddress.shippingAddressStreet1 = userShipping.userShippingStreet1;
  	this.shippingAddress.shippingAddressStreet2 = userShipping.userShippingStreet2;
  	this.shippingAddress.shippingAddressCity = userShipping.userShippingCity;
  	this.shippingAddress.shippingAddressState = userShipping.userShippingState;
  	this.shippingAddress.shippingAddressCountry = userShipping.userShippingCountry;
  	this.shippingAddress.shippingAddressZipcode = userShipping.userShippingZipcode;
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

    this.shippingService.getUserShippingList().subscribe(
    	res=>{
          console.log(res.json());
          this.userShippingList=res.json();
          this.emptyShippingList = false;
        },
        error=>{
          console.log(error.text());
        }
    );

    for (let s in AppConst.usStates) {
    	this.stateList.push(s);
    }

    this.billingAddress.billingAddressState="";

    this.shippingAddress.shippingAddressState="";
  }



}
