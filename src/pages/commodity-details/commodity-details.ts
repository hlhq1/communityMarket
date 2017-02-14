import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'commodity-details',
  templateUrl: 'commodity-details.html'
})

export class ComDetailsPage {
  item;
  constructor(public params: NavParams) {
    this.item = params.data.item;
  }

}
