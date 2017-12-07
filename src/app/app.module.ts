import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { PromoPage } from '../pages/promo/promo';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SettingsPage } from '../pages/settings/settings';
import { CommentariesPage } from '../pages/commentaries/commentaries';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryProvider } from '../providers/category/category';
import { ParseProvider } from '../providers/parse/parse';
import { Camera } from '@ionic-native/camera';
import { ReversePipe } from '../pipes/reverse/reverse';
import { Geolocation } from '@ionic-native/geolocation';
import { HaversineProvider } from '../providers/haversine/haversine';
import { OrderByPipe } from '../pipes/order-by/order-by';
import { ParallaxHeaderDirective } from '../directives/parallax-header/parallax-header';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    SignUpPage,
    LoginPage,
    PromoPage,
    SettingsPage,
    MapPage,
    CommentariesPage,
    ReversePipe,
    OrderByPipe,
    ParallaxHeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    AddPage,
    MapPage,
    PromoPage,
    CommentariesPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryProvider,
    ParseProvider,
    Camera,
    Geolocation,
    HaversineProvider,
    
  ]
})
export class AppModule {}
