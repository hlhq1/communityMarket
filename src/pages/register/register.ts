/**
 * Created by ycc on 16/12/9.
 */
import { Component } from '@angular/core';
import { ViewController,AlertController } from 'ionic-angular';
import { HttpService } from "../servers/http.server";
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  show_warn:boolean = false;
  password_copy:string;

   customer={
    "name":"",
    "account":"",
    "password":"",
    "sex":"",
    "score":0
  }
   registerError={
    "flag":true,
    "info":""
  }
   customerUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Customer/'
  constructor(public viewCtrl: ViewController,private myhttp:HttpService,private myAlert:AlertController) {

  }

  registerService (customer) {
    console.log(this.customerUrl+'?Customer.account='+customer.account);
    this.myhttp.getHttpDatas(this.customerUrl+'?Customer.account='+customer.account).then(res=> {
        console.log("register");
        console.log(res);
        console.log(res==null);
        console.log(res==undefined);
       if(res.Customer!=null&&res.Customer!=undefined){
         //alert("该手机号已被注册");
         let alert=this.myAlert.create({
           title:"提示",
           message:"该手机号已被注册"
         });
         alert.present();
       }else{
         console.log("可以注册");
         this.myhttp.postHttpDatas(this.customerUrl,customer).then(res=>{
           console.log("注册成功");
           console.log(res);
           //alert("注册成功");
           let alert=this.myAlert.create({
             title:"提示",
             message:"注册成功"
           });
           alert.present();
           //销毁页面回到登录
            this.distroyPage();
         })
       }
      }
    )
  }


  register(registerInfo:any){
    if(registerInfo.name=='' || registerInfo.name == undefined){
      //alert("请填写名字");
      let alert=this.myAlert.create({
        title:"提示",
        message:"请填写名字"
      });
      alert.present();
      return;
    }
    else if(registerInfo.account == '' || registerInfo.account == undefined
      || (/^[0-9]{11}$/).test(registerInfo.account)==false){
      //alert("请正确填写11位手机号");
      let alert=this.myAlert.create({
        title:"提示",
        message:"请正确填写11位手机号"
      });
      alert.present();
      return;
    }
    else if(registerInfo.password == '' || registerInfo.password == undefined){
      //alert("请填写密码");
      let alert=this.myAlert.create({
        title:"提示",
        message:"请填写密码"
      });
      alert.present();
      return;
    }
    this.registerService(registerInfo);
  }

  //是否显示密码不一致的提示
  ifShowWarn(){
    this.show_warn = !(this.customer.password==this.password_copy);
  }

  //销毁当前页面
  distroyPage(){
      console.log("distroy page!");
      this.viewCtrl.dismiss();
  }
}



