import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PromoData} from '../../data/promoData';
import { CommentaryData} from '../../data/commentaryData';
import { ParseProvider } from "../../providers/parse/parse";
import { Http } from '@angular/http';
import { CategoryProvider } from "../../providers/category/category";
import { CommentariesPage} from '../commentaries/commentaries';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PromoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-promo',
  templateUrl: 'promo.html',
})
export class PromoPage {
  myDate: Date= new Date();
  id:String;
  streetNumber:string;
  street:string;
  city:string;
  actualPromo:PromoData = new PromoData();
  newCommentary:CommentaryData = new CommentaryData();
  constructor(public navCtrl: NavController, public navParams: NavParams, public parseProvider : ParseProvider, public http: Http, public category : CategoryProvider, private alertCtrl: AlertController) {
    this.id = navParams.get("selectedPromo").id;
    this.getPromo();
    console.log("title : " + this.actualPromo.title)
    this.newCommentary.score = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromoPage');
  }

  getPromo():Promise<any> {

    return this.parseProvider.getAPromo(this.id).then(
      (result)=> {
        this.actualPromo.id=result.id;
        this.actualPromo.title = result.get('title');
        this.actualPromo.price = result.get('price');
        this.actualPromo.picture = result.get('picture');
        this.actualPromo.lat = result.get('lat');
        this.actualPromo.long = result.get('long');
        this.actualPromo.category = result.get('category');
        this.actualPromo.score = result.get('score');
        this.actualPromo.description=result.get('description');
        this.actualPromo.commentaryList=result.get('commentaryList');
        console.log("la liste de commentaire est : " +result.get('commentaryList'))
        var difference = this.myDate.getTime() - result.get('createdAt').getTime();
        this.actualPromo.timeAdded = Math.round(difference /60000);

        if(result.get('beginDate')!=null) {
            this.actualPromo.dateBegin = result.get('beginDate');
        }
        else{
          console.log("wrong end date");
          this.actualPromo.dateBegin=new Date("06-07-2015");
        }

        if(result.get('endDate')!=null) {
            this.actualPromo.dateEnd = result.get('endDate');
        }
        else{
          console.log("wrong end date");
          this.actualPromo.dateEnd=new Date("06-07-2015")
        }

        this.getAdress();
        console.log(result.get('createdAt'));
      },
      (error)=>{
        console.log(error);
      }
    );
  }


addCommentary(){
  this.newCommentary.userName=this.category.actifUser.name;
  this.newCommentary.addDate= this.myDate
  this.actualPromo.commentaryList.push(this.newCommentary);
  console.log(this.actualPromo.commentaryList);
  if(this.newCommentary.text!=null){
    this.actualPromo.score += this.newCommentary.score;
    this.navCtrl.push(PromoPage, {selectedPromo: this.actualPromo});
    this.parseProvider.updateApromo(this.actualPromo);
  }
  else{
    this.showAlertComment();
  }

}

getAdress():void{
    this.http.get('http://api.opencagedata.com/geocode/v1/json?q=' + this.actualPromo.lat + '+' + this.actualPromo.long + '&key=185ac1a244594d22b4ace010b66eb84b ').map(res => res.json()).subscribe(data => {
        console.log(data.results[0].formatted);
        this.streetNumber = data.results[0].components.house_number;
        this.street = data.results[0].components.road;
        this.city = data.results[0].components.county;
    });
}

seeComments(){
  console.log("zerzer")
  this.navCtrl.push(CommentariesPage, {list: this.actualPromo.commentaryList});
}
showAlertComment(){
  let alert = this.alertCtrl.create({
    title: 'Login',
    subTitle: 'Write something',
    buttons: ['Ok']
  });
  alert.present();
}

}
