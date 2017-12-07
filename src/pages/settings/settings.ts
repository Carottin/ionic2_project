import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../home/home';

import { CategoryProvider } from "../../providers/category/category";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  maxDistance:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public category : CategoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  applySettings(){
    this.category.maxDistance = this.maxDistance;
    this.navCtrl.setRoot(HomePage);
  }

}
