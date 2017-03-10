import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Book} from '../../models/book';
import {Router} from "@angular/router";
import {CartService} from '../../services/cart.service';
import {ShippingService} from '../../services/shipping.service';
import {PaymentService} from '../../services/payment.service';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';
import {ShippingAddress} from '../../models/shipping-address';
import {BillingAddress} from '../../models/billing-address';
import {UserPayment} from '../../models/user-payment';
import {UserBilling} from '../../models/user-billing';
import {UserShipping} from '../../models/user-shipping';
import {Payment} from '../../models/payment';

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
  private userPaymentList: UserPayment[] = [];
  private payment: Payment = new Payment();
  private selectedTab: number;
  private emptyShippingList: boolean = true;
  private emptyPaymentList: boolean = true;
  private stateList: string[] = [];

  constructor(
  	private router:Router, 
  	private cartService: CartService, 
  	private shippingService: ShippingService,
  	private paymentService: PaymentService
  	) { }

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
  	this.shippingAddress.shippingAddressName = userShipping.userShippingName;
  	this.shippingAddress.shippingAddressStreet1 = userShipping.userShippingStreet1;
  	this.shippingAddress.shippingAddressStreet2 = userShipping.userShippingStreet2;
  	this.shippingAddress.shippingAddressCity = userShipping.userShippingCity;
  	this.shippingAddress.shippingAddressState = userShipping.userShippingState;
  	this.shippingAddress.shippingAddressCountry = userShipping.userShippingCountry;
  	this.shippingAddress.shippingAddressZipcode = userShipping.userShippingZipcode;
  }

  setPaymentMethod(userPayment: UserPayment) {
  	this.payment.type = userPayment.type;
  	this.payment.cardName = userPayment.cardName;
  	this.payment.cardNumber = userPayment.cardNumber;
  	this.payment.expiryMonth = userPayment.expiryMonth;
  	this.payment.expiryYear = userPayment.expiryYear;
  	this.payment.cvc = userPayment.cvc;
  	this.payment.holderName = userPayment.holderName;
  	this.payment.defaultPayment = userPayment.defaultPayment;
  	this.payment.billingAddress.billingAddressName = userPayment.userBilling.userBillingName;
  	this.payment.billingAddress.billingAddressStreet1 = userPayment.userBilling.userBillingStreet1;
  	this.payment.billingAddress.billingAddressStreet2 = userPayment.userBilling.userBillingStreet2;
  	this.payment.billingAddress.billingAddressCity = userPayment.userBilling.userBillingCity;
  	this.payment.billingAddress.billingAddressState = userPayment.userBilling.userBillingState;
  	this.payment.billingAddress.billingAddressCountry = userPayment.userBilling.userBillingCountry;
  	this.payment.billingAddress.billingAddressZipcode = userPayment.userBilling.userBillingZipcode;
  }

  setBillingAsShipping(checked:boolean){
  	console.log("same as shipping")

  	if(checked) {
  	this.billingAddress.billingAddressStreet1 = this.shippingAddress.shippingAddressStreet1;
  	this.billingAddress.billingAddressStreet2 = this.shippingAddress.shippingAddressStreet2;
  	this.billingAddress.billingAddressCity = this.shippingAddress.shippingAddressCity;
  	this.billingAddress.billingAddressState = this.shippingAddress.shippingAddressState;
  	this.billingAddress.billingAddressCountry = this.shippingAddress.shippingAddressCountry;
  	this.billingAddress.billingAddressZipcode = this.shippingAddress.shippingAddressZipcode;
  } else {
  	this.billingAddress.billingAddressStreet1 = "";
  	this.billingAddress.billingAddressStreet2 = "";
  	this.billingAddress.billingAddressCity = "";
  	this.billingAddress.billingAddressState = "";
  	this.billingAddress.billingAddressCountry = "";
  	this.billingAddress.billingAddressZipcode = "";
  }
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

    this.paymentService.getUserPaymentList().subscribe(
    	res=>{
          console.log(res.json());
          this.userPaymentList=res.json();
          this.emptyPaymentList = false;
        },
        error=>{
          console.log(error.text());
        }
    );

    for (let s in AppConst.usStates) {
    	this.stateList.push(s);
    }

    this.payment.billingAddress = this.billingAddress;
    this.payment.type="";
    this.payment.expiryMonth="";
    this.payment.expiryYear="";
    this.billingAddress.billingAddressState="";
    this.shippingAddress.shippingAddressState="";
  }



}
