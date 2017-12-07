import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentaryData} from '../../data/commentaryData';

/**
 * Generated class for the CommentariesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-commentaries',
  templateUrl: 'commentaries.html',
})
export class CommentariesPage {
  commentaryList:Array<CommentaryData>;
  myDate: Date= new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.commentaryList = navParams.get("list");
    for (let i = 0; i < this.commentaryList.length; i++) {
      var difference = this.myDate.getTime() - this.commentaryList[i].addDate.getTime();
      this.commentaryList[i].timeAdded = Math.round(difference /60000);
    }
    console.log(this.commentaryList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentariesPage');
  }

}
