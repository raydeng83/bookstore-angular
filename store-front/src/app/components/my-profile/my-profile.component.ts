import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";
import {User} from '../../models/user';

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

  constructor (private loginService: LoginService, private userService: UserService, private router: Router){
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

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;
      }
    );

    this.userService.getCurrentUser().subscribe(
    	res => {
    		console.log(res.json());
    		this.user=res.json();
    	},
    	error => {
    		console.log(error);
    	}
    );

}
}
