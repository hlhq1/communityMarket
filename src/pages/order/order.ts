import { Component } from '@angular/core';

import { NavController, Events,AlertController } from 'ionic-angular';//NavParams
import { ORDERDATA } from './mock-orders';
import { SpecificMarketPage } from '../specific-market/specific-market';
import { ComDetailsPage } from '../commodity-details/commodity-details';
import { HttpService } from "../servers/http.server";
import { StorageService } from "../servers/StorageService";
import { logoInPage } from '../logoIn/logoIn';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers:[StorageService]
})
export class OrderPage {
  // items = [];
  orders = [];
  items_info = {};
  order_list_sum:number = 0;
  order_total_bala:number = 0;
  orderItemUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/OrderItem/';
  orderList:any[];
  order_orderItems:any;
  num:any;
  totalMoney:any;
  //构造函数其实就是相当于初始化组件
  constructor(public nav: NavController, public events: Events,public myhttp:HttpService,public localStore:StorageService,private myAlert:AlertController) {
    this.getAllOrder();

  }

  //导航到具体某一家商店
  openSpecificMarketPage(items_info){
    this.nav.push(SpecificMarketPage, {item:items_info});
  }

  //导航到商品详情页面
  openComDetailsPage(item) {
    this.nav.push(ComDetailsPage, { item: item });
  }

  sortItemByOrder(orderItems:any []) {
    var result:any={};
    var index:any=[];
    var num:any={};
    var totalMoney={};
    for(var i=0;i<orderItems.length;i++){
      var orderId=orderItems[i].order.id;
      if(orderId in result){
        result[orderItems[i].order.id].push(orderItems[i]);
      }else{
        index.push(orderItems[i].order);
        result[orderItems[i].order.id]=[orderItems[i]];
      }
    }

    for(var j=0;j<index.length;j++){
      var sum=0;
      var money=0;
      var torderitems=result[index[j].id];
      for(var m=0;m<torderitems.length;m++){
        sum=sum+torderitems[m].num;
        money=money+torderitems[m].num*torderitems[m].product.price;
      }
      num[index[j].id]=sum;
      totalMoney[index[j].id]=money;
    }

    //console.log("sort order");
    //console.log(result);
    //console.log(index);
    this.order_orderItems=result;
    console.log("test");
    console.log(this.order_orderItems);
    this.orderList=index;
    console.log(this.orderList)
    this.num=num;
    this.totalMoney=totalMoney;
  }
  //获得当前登录用户所有的订单项
  getAllOrder(){
    if(this.localStore.read("customerId")==undefined || this.localStore.read("customerId")==null){
      let alert=this.myAlert.create({
        title:"提示",
        message:"请先登录"
      });
      alert.present();
      this.nav.push(logoInPage);
    }else {
      this.myhttp.getHttpDatas(this.orderItemUrl + '?Orderitem.order.customer.id=' + this.localStore.read("customerId")).then(res=> {
        //console.log("order search");
        //console.log(res);
        //console.log("end");
        var items_info = res.Orderitem;
        return items_info
      }).then(items_info=> {
        this.sortItemByOrder(items_info)
      })
    }
  }

}
