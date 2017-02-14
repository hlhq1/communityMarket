import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule }    from '@angular/http';

import { HttpService } from '../pages/servers/http.server'

import { MyApp } from './app.component';
import { OrderPage } from '../pages/order/order';
import { MySetingPage } from '../pages/myseting/myseting';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ComDetailsPage } from '../pages/commodity-details/commodity-details';
import { SpecificMarketPage } from '../pages/specific-market/specific-market';
import { CartPage } from '../pages/cart/cart';
import { MySelfPage } from '../pages/myseting/my-info/my-info';
import { UpdateIntroPage } from '../pages/myseting/my-info/update-intro/update-intro';
import { UpdateNamePage } from '../pages/myseting/my-info/update-name/update-name';
import { UpdateSexPage } from '../pages/myseting/my-info/update-sex/update-sex';
import { AddressPage } from '../pages/Address/address'
import { CommitOrderPage } from '../pages/commitOrderInfo/commitOrderInfo'
import { RegisterPage } from '../pages/register/register'
import { logoInPage } from '../pages/logoIn/logoIn'
import { ScorePage } from '../pages/score/score';
import { BuyMethodPage } from '../pages/buyMethod/buyMethod';
@NgModule({
  declarations: [
    MyApp,
    OrderPage,
    MySetingPage,
    HomePage,
    TabsPage,
    ComDetailsPage,
    SpecificMarketPage,
    CartPage,
    MySelfPage,
    UpdateIntroPage,
    UpdateNamePage,
    AddressPage,
    CommitOrderPage,
    RegisterPage,
    logoInPage,
    UpdateSexPage,
    ScorePage,
    BuyMethodPage
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrderPage,
    MySetingPage,
    HomePage,
    TabsPage,
    ComDetailsPage,
    SpecificMarketPage,
    CartPage,
    MySelfPage,
    UpdateIntroPage,
    UpdateNamePage,
    AddressPage,
    CommitOrderPage,
    RegisterPage,
    logoInPage,
    UpdateSexPage,
    ScorePage,
    BuyMethodPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService
  ]
})
export class AppModule {}
