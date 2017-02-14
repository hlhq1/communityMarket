/**
 * Created by ycc on 16/12/16.
 */
import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams, Events,AlertController } from 'ionic-angular';
import { HttpService } from "../servers/http.server";
import { CartPage } from '../cart/cart'
import { CommitOrderPage } from '../commitOrderInfo/commitOrderInfo'
import { StorageService } from "../servers/StorageService";
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'logoIn.html',
  providers:[StorageService]
})
export class logoInPage {


   user:any = {"password":"", "account":""};
   logoUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Customer/';
  Customer;
  constructor(public params:NavParams, public navCtrl:NavController, public myhttp:HttpService,private localStore:StorageService, private viewCtrl:ViewController,private alertCtrl:AlertController) {

  }

  logo(user){
    this.myhttp.getHttpDatas(this.logoUrl+'?Customer.account='+user.account+'&Customer.password='+user.password).then(res=>{
      console.log("logo");
      console.log(res);
      if(res.Customer==null || res.Customer==undefined){
        ////alert("账号和密码不正确，请重新输入");
        let alert=this.alertCtrl.create({
          title:"提示",
          message:"账号和密码不正确，请重新输入"
        });
        alert.present();
      }else{
        console.log("登录成功");
        console.log(res.Customer[0]);
        this.localStore.write("customerId",res.Customer[0].id);
        console.log("存储数据");
        console.log(this.localStore.read("customerId"));
        this.distroyPage();
      }
    })
  }

  //如果登录后还进入该页面，则直接销毁
  ionViewWillEnter(){
    if(this.localStore.read("customerId")){
      this.distroyPage();
    }
  }

  //跳转到注册界面
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

  //销毁当前页面
  distroyPage(){
      console.log("distroy page!");
      this.viewCtrl.dismiss();
  }
}
