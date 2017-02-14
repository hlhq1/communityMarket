import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { HttpService } from "../../../servers/http.server";

@Component({
  selector: 'page-update-sex',
  templateUrl: 'update-sex.html'
})

export class UpdateSexPage {
    customer:any;
    man:string = "男";
    woman:string = "女";//woman

    private customerUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Customer/';

    constructor(public viewCtrl:ViewController, params:NavParams, private myhttp:HttpService){
        this.customer = params.data.customer;
    }

    distroyPage(){
        console.log("distroy page!");
        //put customer data to server
        this.myhttp.putHttpDatas(this.customerUrl+this.customer.id,this.customer).then(res=>{

        })
        this.viewCtrl.dismiss();
    }

}
