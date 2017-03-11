import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";
import {PaymentService} from "../../services/payment.service";
import {ShippingService} from "../../services/shipping.service";
import {OrderService} from "../../services/order.service";
import {User} from '../../models/user';
import {UserPayment} from '../../models/user-payment';
import {UserBilling} from '../../models/user-billing';
import {UserShipping} from '../../models/user-shipping';
import {Order} from '../../models/order';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private loginError:boolean = false;
  private loggedIn = false;
  private credential = {'username':'', 'password':''};

  private emailSent:boolean = false;
  private usernameExists:boolean = false;
  private emailExists:boolean = false;
  private username:string;
  private email:string;

  private emailNotExists: boolean = false;
  private forgetPasswordEmailSent: boolean = false;
  private recoverEmail:string;

  private user: User = new User();
  private updateSuccess:boolean;
  private newPassword:string;
  private incorrectPassword:boolean;
  private userPayment: UserPayment = new UserPayment();
  private userBilling: UserBilling = new UserBilling();
  private userPaymentList: UserPayment[] = [];  
  private userShipping: UserShipping = new UserShipping();
  private userShippingList: UserShipping[] = [];
  private stateList: string[] = [];

  private selectedProfileTab:number = 0;
  private selectedBillingTab:number = 0;
  private selectedShippingTab:number = 0;

  private defaultUserPaymentId:number;
  private defaultPaymentSet:boolean;

  private defaultUserShippingId:number;
  private defaultShippingSet: boolean;

  private orderList: Order[] = [];
  private order:Order = new Order();
  private displayOrderDetail:boolean;

  constructor (
    private paymentService:PaymentService, 
    private shippingService:ShippingService,
    private loginService: LoginService, 
    private userService: UserService, 
    private orderService: OrderService,
    private router: Router
    ){
  }

  selectedShippingChange(val :number ){
    this.selectedShippingTab=val;
  }

  selectedBillingChange(val :number ){
    this.selectedBillingTab=val;
  }

  onLogin() {
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      res=>{
        console.log(res);
        localStorage.setItem("xAuthToken", res.json().token);
        this.loggedIn=true;
        location.reload();
        this.router.navigate(['/home']);
      },
      error=>{
        this.loggedIn=false;
      }
      );
  }

  onNewAccount() {
    this.usernameExists=false;
    this.emailExists=false;
    this.emailSent = false;
    
    this.userService.newUser(this.username, this.email).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        let errorMessage=error.text();
        if (errorMessage==="usernameExists") this.usernameExists=true;
        if (errorMessage==="emailExists") this.emailExists=true;
      }
      );
  }

  onForgetPassword() {
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;
    
    this.userService.retrievePassword(this.recoverEmail).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        let errorMessage=error.text();
        if (errorMessage==="usernameExists") this.usernameExists=true;
        if (errorMessage==="emailExists") this.emailExists=true;
      }
      );
  }

  onUpdateUserInfo() {
    this.userService.updateUserInfo(this.user, this.newPassword).subscribe(
      res => {
        console.log(res.text());
        this.updateSuccess = true;
      },
      error => {
        console.log(error.text());
        let errorMessage=error.text();
        if (errorMessage==="Incorrect current password!") this.incorrectPassword=true;
      }
      );
  }

  onDisplayOrder (order:Order) {
    console.log(order);
    this.order=order;
    this.displayOrderDetail=true;
  }

  onNewPayment () {
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  onUpdatePayment(payment:UserPayment) {
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;

  }

  onRemovePayment(id:number) {
    this.paymentService.removePayment(id).subscribe(
      res => {
        this.getCurrentUser();

      },
      error => {
        console.log(error.text());
      }
      );
  }

  setDefaultPayment() {
    this.defaultPaymentSet=false;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultPaymentSet=true;
        // this.selectedProfileTab = 2;
        // this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  onNewShipping () {
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedShippingTab = 0;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  onUpdateShipping(shipping:UserShipping) {
    this.userShipping = shipping;
    this.selectedShippingTab=1;
  }

  onRemoveShipping(id:number) {
    this.shippingService.removeShipping(id).subscribe(
      res => {
        this.getCurrentUser();

      },
      error => {
        console.log(error.text());
      }
      );
  }

  setDefaultShipping() {
    this.defaultShippingSet=false;
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultShippingSet=true;
        // this.selectedProfileTab = 2;
        // this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user=res.json();
        this.userPaymentList = this.user.userPaymentList;
        this.userShippingList = this.user.userShippingList;

        for (let index in this.userPaymentList) {
          if (this.userPaymentList[index].defaultPayment) {
            this.defaultUserPaymentId=this.userPaymentList[index].id;
            break;
          }
        }

        for (let i in this.userShippingList) {
          if (this.userShippingList[i].userShippingDefault) {
            this.defaultUserShippingId=this.userShippingList[i].id;
            break;
          }
        }
      },
      error => {
        console.log(error);
      }
      );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;
      }
      );

    this.orderService.getOrderList().subscribe(
      res => {
        this.orderList = res.json();
      },
      error => {
        console.log(error.text());
      }
      );

    this.getCurrentUser();

    for (let s in AppConst.usStates) {
    	this.stateList.push(s);
    }

    this.userBilling.userBillingState="";
    this.userPayment.type="";
    this.userPayment.expiryMonth="";
    this.userPayment.expiryYear="";
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet=false;

    this.userShipping.userShippingState="";
    this.defaultShippingSet=false;

  }
}
