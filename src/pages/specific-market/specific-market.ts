
import { Component, OnInit} from '@angular/core';
import { NavController, NavParams, Events,AlertController } from 'ionic-angular';

import { MAEKETDATAS } from '../servers/mock-markets';
import { ComDetailsPage } from '../commodity-details/commodity-details';
import { CartPage } from '../cart/cart';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { HttpService } from "../servers/http.server";
import { StorageService } from "../servers/StorageService";
import { logoInPage } from '../logoIn/logoIn';

@Component({
  selector: 'specific-market',
  templateUrl: 'specific-market.html',
  providers:[StorageService]
})

export class SpecificMarketPage implements OnInit{

  public products:any;
  width:string;
   productUrl:string="http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Product/";
   cartUrl:string="http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Cart/";
  public store:any;
  abstract;
  Product;
  totalprice:number = 0;

  constructor(public params:NavParams, public nav:NavController, public myhttp:HttpService,private localStore:StorageService,private alertCtrl:AlertController ) {
    this.store = params.data.store;
  }
  ngOnInit():void {
    console.log("store_id");
    console.log(this.store);
    this.getAllproduct(this.store.id);
  }

  //商品价格排序函数
  sortByPrice(productInfoA:any,productInfoB:any) {
    if(productInfoA.price>productInfoB.price){
      return 1;
    }else{
      return -1;
    }
  }
  getAllproduct(storeId:string){//获得某个超市所有的商品
    this.myhttp.getHttpDatas(this.productUrl+'?Product.supermarket.id='+storeId)
      .then(res =>{
        if(res.Product!=null&&res.Product!=undefined){
          this.products= res.Product.sort(this.sortByPrice);//先写死，需要控制数组的index
          console.log(this.products);
        }
    });
  }

  addToCartService(oldCart,product) {
    if (oldCart == null || oldCart==undefined) {//商品没有在购物车中，则在购物车中添加商品
      let body = {
        "product": {"id": product.id, "type": "Product"},
        "customer": {"id": this.localStore.read("customerId"), "type": "Customer"},
        "supermarket":{"id": this.store.id, "type": "Supermarket"},
        "num": 1,
        "joindate": new Date(),
        "iscustomer": 1
      }
      let result;
      this.myhttp.postHttpDatas(this.cartUrl, body)
        .then(res => {
          result = res;
          console.log(result);
          console.log("新增购物车");
          return result
        })
    }else{
      let newnum =oldCart[0].num+1;
      let updatebody = {
        "product": {"id": product.id, "type": "Product"},
        "customer": {"id": this.localStore.read("customerId"), "type": "Customer"},
        "supermarket":{"id": this.store.id, "type": "Supermarket"},
        "num": newnum,
        "joindate": new Date(),
        "iscustomer": 1
      }
      console.log(updatebody);
      console.log(this.cartUrl+oldCart[0].id);
      this.myhttp.putHttpDatas(this.cartUrl+oldCart[0].id, updatebody)
        .then(res => {
          //return res.Cart;
          console.log("join cart is null");
          console.log(res);
        })
      console.log("修改购物车的数量");
    }
  }
  //加入购物车
  addToCart(product){
    console.log("用户登录信息");
    console.log(this.localStore.read("customerId"));
    if(this.localStore.read("customerId")!=null&&this.localStore.read("customerId")!=undefined){
      let isProductExistUrl=this.cartUrl+'?Cart.customer.id='+this.localStore.read("customerId")+'&Cart.product.id='+product.id;
        console.log(isProductExistUrl)
        let oldCart;
        return this.myhttp.getHttpDatas(isProductExistUrl).then(
            res =>{
              if(res==null || res==undefined){
                oldCart=null;
              }else{
                oldCart=res.Cart;
                console.log("isExist");
              }
              console.log(oldCart);
              return oldCart;
          }).then(oldCart=>{
            console.log("next then");
            console.log(oldCart);
           this.addToCartService(oldCart,product);
        }
      )
    }else{
      let alert=this.alertCtrl.create({
        title:"提示",
        message:"请先登录"
      });
      alert.present();
      this.nav.push(logoInPage);
    }
  }

  //根据商品的名字找某个超市的商品
  searchProductbyName(productName:string){
    this.myhttp.getHttpDatas(this.productUrl+'?Product.supermarket.id='+this.store.id+'&Product.name=(like)'+productName).then(
      res=>{
        if(res == null || res ==undefined){
          let alert=this.alertCtrl.create({
            title:"提示",
            message:"你要找的商品不在"
          });
          alert.present();
        }else{
          this.products=res.Product;
        }
      }
    )
  }

  //导航购物车
  goToCart(){
    var customerId=this.localStore.read("customerId");
    if(customerId==null||customerId==undefined){
      //alert("请先登录");
      let alert=this.alertCtrl.create({
        title:"提示",
        message:"请先登录"
      });
      alert.present();
      this.nav.push(logoInPage);
    }else{
      this.nav.push(CartPage, {customerId:customerId});
    }
  }
  openComDetailsPage(item) {
    this.nav.push(ComDetailsPage, {item: item});
  }
}
