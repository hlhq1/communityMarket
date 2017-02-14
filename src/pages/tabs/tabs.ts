import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { OrderPage } from '../order/order';
import { MySetingPage } from '../myseting/myseting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab3Root: any = OrderPage;
  tab4Root: any = MySetingPage;

  constructor() {

  }
}
