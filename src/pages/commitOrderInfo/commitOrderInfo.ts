/**
 * Created by ycc on 16/12/15.
 */
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../servers/http.server";
import { AddressPage } from '../Address/address'
import { OrderPage } from '../order/order';
import { StorageService } from "../servers/StorageService";
import { logoInPage } from '../logoIn/logoIn';
@Component({
  selector: 'commitOrderInfo',
  templateUrl: 'commitOrderInfo.html',
  providers:[StorageService]
})

export class CommitOrderPage {
   orderUrl:string = 'http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Order/'
   orderItemUrl:string = 'http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/OrderItem/'
   productUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Product/';
   scoreUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Score/';
   customerUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Customer/';
   cartUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Cart/'
   supermarket:any;
   cartItems:any[];
   user:any;
   totalMoney;
   score;
  constructor(public params:NavParams, public navCtrl:NavController, public myhttp:HttpService,private localStore:StorageService) {
    //this.nav.push(CartPage,{"name":name,"tel":tel,"address":address,"supermarket":this.supermarket,"cartItems":this.cartItems});
    this.user=params.data.user;
    this.supermarket=params.data.supermarket;
    this.cartItems=params.data.cartItems;
    this.totalMoney=this.addTotalNumOfProduct(this.cartItems)
  }

  //计算选择商品的总价格
  addTotalNumOfProduct(buyCarts:any []){
    var totalMoney=0;
    for(var i=0;i<buyCarts.length;i++){
      var tempProduct=buyCarts[i].product;
      totalMoney=totalMoney+(buyCarts[i].product.price *buyCarts[i].num);
    }
    return totalMoney;
  }

  //点击订单提交之后
  createOrderItem(buyCarts:any[],order){
    var totalMoney=this.addTotalNumOfProduct(buyCarts);
    var succCount=0;
    var totalScore=0;
    for(var i=0;i<buyCarts.length;i++){
      var cart=buyCarts[i];
      let body={
        "num":cart.num,
        "totalprice":cart.num*cart.product.price,
        "product":{"id":cart.product.id,"type":"Product"},
        "order":{"id":order.id,"type":"Order"}
      }
      this.myhttp.postHttpDatas(this.orderItemUrl,body).then(res=>{
        succCount=succCount+1;
      }).then(res=>{
        //积分表的新增,商品库存的修改
        var body=cart.product;
        body.stock=body.stock-cart.num;
        this.myhttp.putHttpDatas(this.productUrl+cart.product.id,body).then(res=>{
          console.log("更新商品库存");
          console.log(res);
        }).then(res=>{
         var temp= {
            "num":body.score*cart.num,
            "date":new Date(),
            "customer":{
            "id":this.localStore.read("customerId"),
              "type":"Customer"
          },
            "product":{
            "id":cart.product.id,
              "type":"Product"
          }
          }
          totalScore=totalMoney+body.score*cart.num;
          this.myhttp.postHttpDatas(this.scoreUrl,temp);
          //this.myhttp.deleteDatas(this.cartUrl+body.id);
        })
      })
    }
    var logistic=5;
    if(totalMoney>50){
      logistic=0;
    }
    //更新会员积分
    var id=this.localStore.read("customerId");
    this.myhttp.getHttpDatas(this.customerUrl+id).then(res=>{
      var customer=res;
      customer.score=customer.score+totalScore;
      this.myhttp.putHttpDatas(this.customerUrl+id,customer);
    })
    //更新邮费和总价
    var updateorder = {
      "createdate":order.createdate,
      "name":order.name,
      "address":order.address,
      "tel":order.tel,
      "totalprice":totalMoney,
      "logistic":logistic,
      "state":1,
      "supermarket":{"id":order.supermarket.id,"type":"Supermarket"},
      "customer":{"id":order.customer.id,"type":"Customer"}
    }
    this.myhttp.putHttpDatas(this.orderUrl+order.id,updateorder).then(res=>{
      //alert("购买成功要跳转到订单界面");

      this.navCtrl.push(OrderPage);
    });
  }


  //填入地址和收件人的名字，电话信息后，按确定按钮生成orderInfo
  createOrder(){
    if(this.cartItems!=null&&this.cartItems!=undefined){
      var order = {
        "createdate":new Date(),
        "name":this.user.name,
        "address":this.user.address,
        "tel":this.user.tel,
        "totalprice":0,
        "logistic":0,
        "state":0,
        "supermarket":{"id":this.supermarket.id,"type":"Supermarket"},
        "customer":{"id":"1480063836378","type":"Customer"}
      }
      this.myhttp.postHttpDatas(this.orderUrl,order).then(res=>{
        var neworder=res;
        return neworder;
      }).then(neworder=>{
        this.createOrderItem(this.cartItems,neworder);
      }).then()
    }
  else{
      alert("未选择要购买的东西");
    }
  }




}
