import { Component } from '@angular/core';
import { ImagePicker } from 'ionic-native';

import { NavController, NavParams } from 'ionic-angular';
import { UpdateNamePage } from './update-name/update-name';
import { UpdateIntroPage } from './update-intro/update-intro';
import { HttpService } from "../../servers/http.server";
import { UpdateSexPage } from "./update-sex/update-sex";

@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html'
})

export class MySelfPage {
  customer:any;
  customerUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Customer/';
  level:string='普通会员';
  headImgUrl:string = "../../assets/com_img/test.png";
  constructor(public navCtrl: NavController,public params: NavParams,private myhttp:HttpService) {
    this.customer=params.data.customer;
    this.getLevel(this.customer.score);
  }

    openUpdateSex(){
        console.log("updateSex!");
        this.navCtrl.push(UpdateSexPage,{"customer":this.customer});
    }

   //跳转到修改姓名的界面
    openUpdateNamePage(){
        console.log("openUpdateNamePage!");
        this.navCtrl.push(UpdateNamePage,{"customer":this.customer});
    }

  //点击更换头像
  updateHeadImg(){
    let options={};
    ImagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          // this.headImgUrl = results[i];
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

  //根据积分获得会员等级
   getLevel(score){
     var temp;
     if(score<50){
       temp="普通会员";
     }else if(score<100){
       temp="高级会员";
     }else{
       temp="钻石会员";
     }
     this.level=temp;
   }

}
