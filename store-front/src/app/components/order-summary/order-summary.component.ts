import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  private serverPath = AppConst.serverPath;

  constructor() { }

  ngOnInit() {
  }

}
