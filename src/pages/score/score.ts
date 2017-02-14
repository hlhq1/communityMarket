import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from "../servers/http.server.ts";
import { StorageService } from "../servers/StorageService";
@Component({
  selector: 'score',
  templateUrl: 'score.html',
  providers:[StorageService]
})
export class ScorePage {
  scoreUrl:string='http://112.74.62.114:8080/Entity/U3ad1b2223bef5/market/Score/';
  scoreList:any[];

  constructor(public params:NavParams, public nav:NavController,public localStore:StorageService) {
    this.scoreList=params.get("scoreList");
    console.log("jifen");
    console.log(this.scoreList);
  }

}
