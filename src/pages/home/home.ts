import { Component, ViewChild,OnInit,ElementRef } from '@angular/core';
import { NavController, Slides, MenuController,AlertController } from 'ionic-angular'; //NavParams
import { HttpService } from "../servers/http.server";
import { SpecificMarketPage } from '../specific-market/specific-market';
import { CartPage } from '../cart/cart';
import { RegisterPage } from '../register/register';
import { logoInPage } from '../logoIn/logoIn';
import { Geolocation} from 'ionic-native';
import { StorageService } from "../servers/StorageService";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[StorageService]
})

export class HomePage implements OnInit{
  mycontent:any;
  isChange:boolean=false;
  abstract;
  stores :any= [];
  tempStores:any=[];
  private storeUrl:string = "http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Supermarket/";
  private baiduUrl:string='http://api.map.baidu.com/geocoder/v2/?output=json&pois=1&ak=QKjU6HrU5mcU3nO8eoioSwHmpksIRKZk&location=';
  Supermarket;
  latitude:any;
  longitude:any;
  location:any;
  condition={"storeName":"","storeAddress":""};
  homeSlideOptions = {//用于轮播图获取当前页码
    loop:false,
    pager:true
  }

//---------------------------------调用服务HttpService-------------------------------------
  constructor(private navCtrl:NavController,public myhttp:HttpService,private localStore:StorageService,private menuCtrl:MenuController,private alertCtrl:AlertController){

  }
  ngOnInit():void{
    this.getAllStores();
  }
//---------------------------------调用服务HttpService-------------------------------------

  getAllStores(){
    this.myhttp.getHttpDatas(this.storeUrl).then(res =>{
      this.tempStores = res.Supermarket;
      this.getLocation();
    });

  }
  sortByDistance(storeA:any,storeB:any){
    if(storeA.distance>storeB.distance){
      return 1;
    }else{
      return -1
    }
  }
  //获取当前位置
  getLocation(){
    //var options = {
    //  enableHighAccuracy: true,
    //  timeout: 5000,
    //  maximumAge: 0
    //};
    Geolocation.getCurrentPosition().then(resp=>{
      this.latitude=resp.coords.latitude;
      this.longitude=resp.coords.longitude;
    }).then(resp=>{
      this.myhttp.getHttpDatas(this.baiduUrl+this.latitude+","+this.longitude).then(res=>{
        this.location=res.result.formatted_address;
        this.getStoreDistance(this.tempStores);
      })
    })
  }


  doRefresh(refresher){
    console.log("refresh is on!!!");
    this.myhttp.getHttpDatas(this.storeUrl).then(res => this.stores = res);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 200);
  }

  //商店的查询
  search(){
     this.myhttp.getHttpDatas(this.storeUrl+'?Supermarket.name=(like)'+this.condition.storeName+'&Supermarket.address=(like)'+this.condition.storeAddress).then(res =>{
      this.stores = res.Supermarket;//先写死，需要控制数组的index
      this.getStoreDistance(this.stores);
      console.log(this.stores);
    });
  }
  //导航到具体某一家商店
  goToStore(store){
    this.navCtrl.push(SpecificMarketPage,{store:store});
  }
  //导航购物车
  goToCart(){
    var customerId=this.localStore.read("customerId");
    if(customerId==null||customerId==undefined){
      let alert=this.alertCtrl.create({
        title:"提示",
        message:"请先登录"
      });
      alert.present();
      this.navCtrl.push(logoInPage);
    }else{
      this.navCtrl.push(CartPage, {customerId:customerId});
    }
  }
  //跳转到注册界面
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }
  //跳转到登录界面
  goToLogoIn(){
    this.navCtrl.push(logoInPage);
  }

   lw(a,b,c){
     a =Math.max(a,b);
     a=Math.min(a,c);
     return a;
   }
   ew(a,b,c){
     while(a>c){
       a=a-(c-b);
     }
     while(a<b){
       a=a+(c-b);
     }
     return a;
   }
   oi(a){
    return Math.PI*a/180;
   }
   Td(a,b,c,d){
     return 6370996.81 * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a));
   }
   Wv(a,b){
    if(a==b){
      return 0;
    }else{
      a.lng=this.ew(a.lng,-180,180);
      a.lat = this.lw(a.lat, -74, 74);
      b.lng = this.ew(b.lng, -180, 180);
      b.lat = this.lw(b.lat, -74, 74);
      return this.Td(this.oi(a.lng), this.oi(b.lng), this.oi(a.lat), this.oi(b.lat))
    }
  }
  getDistance(a,b){
    var c=this.Wv(a,b);
    return c;
  }

   getStoreDistance(stores:any[]){
    var mapurl:string='http://api.map.baidu.com/geocoder/v2/?output=json&ak=WhOpEKPAkkIEBgFd1pGi97xO&address=';
     let mylocation={
      "lng":this.longitude,
      "lat":this.latitude
    };
     let result:any=[];
     for(let i in stores){
      this.myhttp.getHttpDatas(mapurl+stores[i].address).then(res=>{
        if(res.result!=null&&res.result!=undefined){
          var lng=res.result.location.lng;//经度
          var lat=res.result.location.lat;//纬度
        }
        var temp={
          "lng":lng,
          "lat":lat
        }
        var distance=this.getDistance(mylocation,temp);
        stores[i].distance=distance;
        result.push(stores[i]);
      }).then(res=>{

        this.stores=result;
        this.stores.sort(this.sortByDistance);
      })
    }
  }


  //打开菜单
  openMenu(){
    this.menuCtrl.open();
  }

}


