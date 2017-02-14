import { Component } from '@angular/core';
import { NavController,AlertController} from 'ionic-angular';
import { MySelfPage } from './my-info/my-info';
import { HttpService } from "../servers/http.server";
import { StorageService } from "../servers/StorageService";
import { ScorePage } from '../score/score';
import { logoInPage } from '../logoIn/logoIn';
import { BuyMethodPage } from '../buyMethod/buyMethod';
@Component({
  selector: 'page-myseting',
  templateUrl: 'myseting.html',
  providers:[StorageService]
})
export class MySetingPage {
   customerUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Customer/';
   scoreUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Score/';
  scoreList:any;
  exit_or_login:string;

  mockdata={
      name:"",
      id:"",
      headpic_url:"",
      score:0,
      sex:""
  }

  //items = [
  //  // {
  //  //   icon:"ios-archive-outline",
  //  //   name:"订单",
  //  //   color:"#09f",
  //  //   fun:"openOrderPage()",
  //  //   isGift:false
  //  // },
  //  {
  //    icon:"ios-heart",
  //    name:"收藏",
  //    color:"#09f",
  //    fun:"openOrderPage()",
  //    isGift:true
  //  },
  //  {
  //    icon:"ios-calculator",
  //    name:"积分",
  //    color:"#09f",
  //    fun:"openOrderPage()",
  //    isGift:false
  //  },
  //  {
  //    icon:"ios-card",
  //    name:"礼包",
  //    color:"#f53d3d",
  //    fun:"openOrderPage()",
  //    isGift:false
  //  },
  //  {
  //    icon:"ios-settings",
  //    name:"设置",
  //    color:"#09f",
  //    fun:"openOrderPage()",
  //    isGift:false
  //  }
  //];

//ios-paper-outline ios-cog
  constructor(public navCtrl: NavController,private myhttp:HttpService,private localStore:StorageService,private myAlert:AlertController) {
    // this.getCustomerById('1480063836378')
  }

  //每次将要进入该页面，都要执行本判断
  ionViewWillEnter(){
    console.log("将要进入mysetting页面！");
    //确定按钮值--退出登录 or 登录
    if(this.localStore.read("customerId")==undefined ||this.localStore.read("customerId")==null){
      let alert=this.myAlert.create({
        title:"提示",
        message:"请先登录"
      });
      alert.present();
    }else{
      this.getCustomerById(this.localStore.read("customerId"));
    }
  }



  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
  //跳转函数 我的信息展示
  myInfoDetails(self_info_data){
    console.log(self_info_data);
     this.navCtrl.push(MySelfPage, {customer:self_info_data});
  }

  openOrderPage(){
    console.log("打开order！");
  }

  exit_login(){
    if(this.localStore.read("customerId")){
      this.localStore.remove("customerId");
    }
    //this.exit_or_login = "登录";
    this.exit_login();
  }

  //获得当前登录的用户
  getCustomerById(customerId){
    console.log(this.customerUrl+customerId);
    this.myhttp.getHttpDatas(this.customerUrl+customerId).then(res=>{
      this.mockdata=res;
    })
  }

  //跳转到积分详情界面
  goToScore() {
    this.myhttp.getHttpDatas(this.scoreUrl + '?Score.customer.id=' + this.localStore.read("customerId")).then(res=> {
      this.scoreList = res.Score;
      console.log("积分详情");
      console.log(this.scoreList);
      this.navCtrl.push(ScorePage, {"scoreList": this.scoreList});
    })
  }
    //跳转到登录界面
  goToLogoIn(){
    this.navCtrl.push(logoInPage);
  }
  goToBuyMethod(){
    this.navCtrl.push(BuyMethodPage);
  }
}
