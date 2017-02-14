import { Component } from '@angular/core';
import { HttpService } from "../../../servers/http.server";
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-update-name',
  templateUrl: 'update-name.html'
})

export class UpdateNamePage {

   customer:any;
   customerUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Customer/';
  constructor(public navCtrl: NavController,public params: NavParams,private myhttp:HttpService) {
    this.customer=params.data.customer;
  }

  updateName(customer){
    this.myhttp.putHttpDatas(this.customerUrl+customer.id,customer).then(res=>{
      // console.log("修改成功,跳转到上一个界面");
      // this.navCtrl.push(MySelfPage,{"customer":this.customer});
      // 写的这个方法有点问题，会导致一个新的页面入栈

      console.log(customer.name);
    })
  }

}
