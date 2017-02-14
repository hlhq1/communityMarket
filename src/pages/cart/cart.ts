import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpService } from "../servers/http.server";
import { OrderBy } from '../order/OrderBy'
import { AddressPage } from '../Address/address'
@Component({
  selector: 'cart',
  templateUrl: 'cart.html'
})

export class CartPage {
  customerId:string;
   cartUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Cart/';
   orderUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Order/'
   orderItemUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/OrderItem/'
  cartItems:any;
  supermarkets:any;
  Cart;
  private chooseSuper:any;
  constructor(public params: NavParams,public nav:NavController,public myhttp:HttpService,private alertCtrl:AlertController) {
    this.customerId= params.data.customerId;
    this.getAllCart()
  }

  //跳转到填写收件人和联系方式
  goToAddress(){
    if(this.chooseSuper.isChoose){
      console.log("haha");
      console.log(this.chooseSuper);
      console.log(this.cartItems[this.chooseSuper.id]);
      this.nav.push(AddressPage,{"supermarket":this.chooseSuper,"cartItems":this.cartItems[this.chooseSuper.id]});
    }else{
      //alert("没有选择要购买的超市商品");
      let alert=this.alertCtrl.create({
        title:"提示",
        message:"没有选择要购买的超市商品"
      });
      alert.present();
    }
  }
  //保证只会有一个超市的商品被购买
  getSelect(supermarket:any){
    if(supermarket.isChoose){
      for(var i=0;i<this.supermarkets.length;i++){
        if(this.supermarkets[i].id != supermarket.id){
          this.supermarkets[i].isChoose=false;
        }else{
          this.supermarkets[i].isChoose=true;
          this.chooseSuper=supermarket;
        }
      }
    }
  }

  //按照价格对商品进行排序
  sortByPreice(cartsInfoA:any,cartsInfoB:any) {
    if(cartsInfoA.product.price>cartsInfoB.product.price){
        return 1;
    }else{
        return -1
    }
  }

  //按照不同超市对产品进行排序，方便购物车
  sortBySupermarketAndPrice(cartsInfo:any []){
    var result:any={};
    var index:any=[];
    var supermarketInfos=[];
    for(var i=0;i<cartsInfo.length;i++){
      var id =cartsInfo[i].supermarket.id;
      if(id in result){
        result[cartsInfo[i].supermarket.id].push(cartsInfo[i]);
      }else{
        index.push(cartsInfo[i].supermarket.id);
        cartsInfo[i].supermarket.isChoose=false;
        supermarketInfos.push(cartsInfo[i].supermarket);
        result[cartsInfo[i].supermarket.id]=[cartsInfo[i]];
      }
    }
    for(var j=0;j<index.length;j++){
      result[index[j]]=result[index[j]].sort(this.sortByPreice);
    }
    this.supermarkets=supermarketInfos;
     return result;
  }

  //获得某个用户所有的购物车商品
  getAllCart(){
    this.myhttp.getHttpDatas(this.cartUrl+'?Cart.customer.id='+this.customerId).then(res =>{
      let items = res.Cart;//先写死，需要控制数组的index
      if(items ==null || items == undefined){
        console.log("购物车为空");
      }else{
        var temp=this.sortBySupermarketAndPrice(items)
        console.log(temp);
        this.cartItems=temp;
      }
    });
  }

  //购物车中订单项的删除
  removeCartItem(item,supermarketId){
    this.myhttp.deleteDatas(this.cartUrl+item.id);
    var temp=this.cartItems[supermarketId];
    var newCartItems=[];
    for(var i=0;i<temp.length;i++){
      if(temp[i].id!=item.id){
        newCartItems.push(temp[i]);
      }
    }
    this.cartItems[supermarketId]=newCartItems;
  }




}
