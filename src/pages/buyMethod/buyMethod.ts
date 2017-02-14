/**
 * Created by ycc on 16/12/15.
 */
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from "../servers/http.server";
import { CartPage } from '../cart/cart'
import { CommitOrderPage } from '../commitOrderInfo/commitOrderInfo'
@Component({
  selector: 'buyMethod',
  templateUrl: 'buyMethod.html'
})
export class BuyMethodPage {

  supermarket:any;
  cartItems:any[];
  user:any = {"name": "", "tel": "", "address": ""};

  constructor(public params:NavParams, public nav:NavController, public myhttp:HttpService) {
    this.supermarket = params.get("supermarket");
    this.cartItems = params.get("cartItems");
  }
}
