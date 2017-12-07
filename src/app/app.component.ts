import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryProvider} from '../providers/category/category';


import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { AddPage } from '../pages/add/add';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { CommentariesPage } from '../pages/commentaries/commentaries';


declare var window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  categories: Array<{title: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private toastCtrl: ToastController, private category : CategoryProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.categories = [
      { title: 'All' },
      { title: 'Food' },
      { title: 'Clothes' },
      { title: 'Video Games' },
      { title: 'DVD' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToSettings(){
    this.nav.setRoot(SettingsPage);
  }

  setActiveCategory(cat){
    this.category.category = cat;
    this.showToast(this.category.category,3000,'bottom');
    this.nav.setRoot(HomePage);
  }

  showToast(message, duration, position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  logout (){
    this.nav.setRoot(LoginPage);
  }

}
