import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PromoData } from '../../data/promoData';
import { HomePage} from '../home/home';
import { ParseProvider } from "../../providers/parse/parse";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { CategoryProvider } from "../../providers/category/category";
/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  public base64Image: string;
  promo:PromoData = new PromoData();

  beginDate:Date;
  endDate:Date;


  constructor(public navCtrl: NavController, public navParams: NavParams, public parseProvider: ParseProvider,private camera: Camera, public http: Http, public geolocation: Geolocation, private alertCtrl: AlertController, public category : CategoryProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }


  postPromo():any{
    this.geolocation.getCurrentPosition().then((resp) => {
      this.promo.lat = resp.coords.latitude;
      this.promo.long = resp.coords.longitude;
      console.log("zen" + this.promo.lat);
      console.log("zen" + this.promo.long);
      this.promo.picture = this.base64Image;
      this.promo.score = 0;
      this.promo.idUser = this.category.actifUser.id;
      if(this.beginDate!=null){
        this.promo.dateBegin = this.beginDate;
      }
      if(this.endDate != null){
        this.promo.dateEnd = this.endDate;
      }

      if(this.promo.title != null && this.promo.price !=null && this.promo.description != null /*&& this.promo.picture != undefined */&& this.promo.category!=null)
      {
        console.log("zerzer");
        this.parseProvider.addPromo(this.promo)
        this.navCtrl.setRoot(HomePage)
      }
      if(this.promo.title == null || this.promo.price ==null || this.promo.description == null /*|| this.promo.picture == undefined*/ ||this.promo.category==null){
        this.showAlertlogin();
        return 0;
      }


      //this.navCtrl.push(HomePage)
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  showAlertlogin(){
    let alert = this.alertCtrl.create({
      title: 'Empty',
      subTitle: 'All field must be completed',
      buttons: ['Ok']
    });
    alert.present();
  }

takePicture(){
  this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
  }).then((imageData) => {
    // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      var url = 'http://uploads.im/api?upload=' + this.base64Image;
      var response = this.http.get(url).map(res => res.json());
  }, (err) => {
      console.log(err);
  });
}
}
