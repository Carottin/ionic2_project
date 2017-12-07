import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../data/userData';
import { ParseProvider } from "../../providers/parse/parse";
import { AlertController } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { MenuController } from 'ionic-angular/index';

/**
 * Generated class for the SignUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  user:UserData = new UserData;
  userList : Array<UserData> = new Array();
  passwordVerification : string;
  canSignup:boolean = false;

  constructor(public navCtrl: NavController, private menu: MenuController,public navParams: NavParams, public parseProvider: ParseProvider, private alertCtrl: AlertController) {
  }

  addUser(){
    this.getUserList();
    console.log("test")
    if (this.user.password==null || this.user.name==null || this.passwordVerification==null){
      this.showAlertEmpty();
    }
    if (this.user.password != this.passwordVerification){
      this.showAlertPassword();
    }
    if (this.user.password!=null && this.user.name!=null && this.passwordVerification!=null && this.user.password == this.passwordVerification && this.canSignup==true){
      console.log("test")
      this.parseProvider.addUser(this.user)
      this.navCtrl.push(LoginPage)
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
    this.menu.swipeEnable(false, 'menu1');
  }

  getUserList():any {
    console.log("ae")
    this.userList=[];
    return this.parseProvider.getUsers().then(
      (result)=> {
      for (let i = 0; i < result.length; i++) {
          if (this.user.name == result[i].get('name'))
          {
              console.log(result[i].get('name'));
              this.showAlertUsername();
              this.canSignup = false;
              return false
          }
          else{
            this.canSignup=true;
          }
        }
      },
      (error)=>{
        console.log(error);
      }
    );

  }

  showAlertPassword(){
    let alert = this.alertCtrl.create({
      title: 'Password',
      subTitle: 'Passwords must be the same',
      buttons: ['Ok']
    });
    alert.present();
  }
  showAlertEmpty(){
    let alert = this.alertCtrl.create({
      title: 'Empty',
      subTitle: 'All field must be completed',
      buttons: ['Ok']
    });
    alert.present();
  }
  showAlertUsername(){
    let alert = this.alertCtrl.create({
      title: 'Username',
      subTitle: 'this username already exist',
      buttons: ['Ok']
    });
    alert.present();
  }

}
