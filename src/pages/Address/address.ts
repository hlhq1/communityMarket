/**
 * Created by ycc on 16/12/15.
 */
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from "../servers/http.server";
import { CartPage } from '../cart/cart'
import { CommitOrderPage } from '../commitOrderInfo/commitOrderInfo'
@Component({
  selector: 'address',
  templateUrl: 'address.html'
})
export class AddressPage {

   supermarket:any;
   cartItems:any[];
   user:any={"name":"","tel":"","address":""};
  constructor(public params:NavParams, public nav:NavController, public myhttp:HttpService) {
     this.supermarket=params.get("supermarket");
     this.cartItems=params.get("cartItems");
  }

  //获得用户输入的电话和地址信息，跳回到
  returnToCommitOrderPage(user){
    console.log("test");
    console.log(user);
    console.log(this.cartItems)
    this.nav.push(CommitOrderPage,{"user":this.user,"supermarket":this.supermarket,"cartItems":this.cartItems});
  }
}

