import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage} from '../sign-up/sign-up';
import { HomePage} from '../home/home';
import { ParseProvider } from "../../providers/parse/parse";
import { CategoryProvider } from "../../providers/category/category";
import { UserData } from '../../data/userData';
import { AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/index';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user:UserData = new UserData;
  name:string = null;
  password:string=null;

  constructor(public navCtrl: NavController, private menu: MenuController, public navParams: NavParams, public parseProvider: ParseProvider, public category : CategoryProvider, private alertCtrl: AlertController) {
    console.log("qsdqsd")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menu.swipeEnable(false, 'menu1');
  }
  goToSignUp()
  {
    this.navCtrl.push(SignUpPage)
  }

  login():any{
    return this.parseProvider.getUsers().then(
      (result)=> {
      for (let i = 0; i < result.length; i++) {
          if (this.name == result[i].get('name') && this.password == result[i].get('password'))
          {
            this.user.name = result[i].get('name');
            this.user.password = result[i].get('password');
            this.user.id = result[i].id;
            this.category.actifUser = this.user;
            this.navCtrl.setRoot(HomePage);
            return 0;
          }
        }
        this.showAlertlogin();
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  showAlertlogin(){
    let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Wrong password or username',
      buttons: ['Ok']
    });
    alert.present();
  }


}
