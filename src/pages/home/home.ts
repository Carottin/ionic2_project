import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPage} from '../add/add';
import { SettingsPage} from '../settings/settings';
import { PromoPage} from '../promo/promo';
import { LoginPage} from '../login/login';
import { PromoData} from '../../data/promoData';
import { ParseProvider } from "../../providers/parse/parse";
import { CategoryProvider } from "../../providers/category/category";
import { HaversineProvider } from "../../providers/haversine/haversine";
import { ReversePipe } from "../../pipes/reverse/reverse";
import { OrderByPipe } from "../../pipes/order-by/order-by";
import { Geolocation } from '@ionic-native/geolocation';
import { MenuController } from 'ionic-angular/index';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  promosList : Array<PromoData> = new Array();
  myDate: Date= new Date();
  activeCategory = ""
  activeSort:string;
  constructor(public navCtrl: NavController, private menu: MenuController, public parseProvider: ParseProvider, public haversineProvider:HaversineProvider,public geolocation: Geolocation, public category : CategoryProvider) {
    this.getListPromos();
    this.activeCategory = category.category;
    this.activeSort = category.sortType;
    this.menu.swipeEnable(true, 'menu1');

  }

  getListPromos(){
    this.geolocation.getCurrentPosition().then((resp) => {
      return this.parseProvider.getPromos().then(
        (result)=> {
          console.log("in result")
          console.log(result.length)
          for (let i = 0; i < result.length; i++) {
            console.log("ae")
            if (this.activeCategory == "All" || result[i].get('category') == this.activeCategory)
            {
              let p1:PromoData = new PromoData();
              p1.title = result[i].get('title');
              p1.price = result[i].get('price');
              p1.picture = result[i].get('picture');
              p1.id = result[i].id;
              p1.description=result[i].get('description');
              p1.distance = this.haversineProvider.haversine(resp.coords.latitude,resp.coords.longitude,result[i].get('lat'),result[i].get('long'));
              p1.score = result[i].get('score');
              console.log("La distance est "+p1.distance)
              console.log("La distance max est "+this.category.maxDistance)
              if(p1.distance < this.category.maxDistance){
                this.promosList.push(p1);
              }

              if(this.category.sortType=="Distance")
              {
                this.promosList.sort(function (a, b) {
                  return b.distance - a.distance;
                });
              }

              if(this.category.sortType=="Time")
              {
                this.promosList.sort(function (a, b) {
                  return b.timeAdded - a.timeAdded;
                });
              }

              if(this.category.sortType=="Score")
              {
                this.promosList.sort(function (a, b) {
                  return  a.score - b.score;
                });
              }

              var difference = this.myDate.getTime() - result[i].get('createdAt').getTime();
              p1.timeAdded = Math.round(difference /60000);
              p1.dateType="min";

              if(p1.timeAdded/60 > 1){
                p1.timeAdded = Math.round(p1.timeAdded/60);
                p1.dateType="hour"
                if(p1.timeAdded/24 > 1) {
                  p1.timeAdded = Math.round(p1.timeAdded/24);
                  p1.dateType="days"
                  if(p1.timeAdded/31 > 1) {
                    p1.timeAdded = Math.round(p1.timeAdded/31);
                    p1.dateType="months"
                    if(p1.timeAdded/12 > 1) {
                      p1.timeAdded = Math.round(p1.timeAdded/12);
                      p1.dateType="years"
                    }
                  }
                }

              }

              console.log("ajouté il y a : "+ Math.round(difference /60000))
            }
          }
        },
        (error)=>{

          console.log(error);
        }
      );
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  goToPromo (promo:PromoData)
  {
    console.log("la promo est : " +promo.id)
    this.navCtrl.push(PromoPage, {selectedPromo: promo});
  }

  logOut (){
    this.navCtrl.setRoot(LoginPage);
  }

  addContent () {
    this.navCtrl.push(AddPage)
  }

  doRefresh() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  goToSettings(){
    this.navCtrl.push(SettingsPage);
  }

}
