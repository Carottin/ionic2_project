import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import {PromoData} from '../../data/promoData'
import 'rxjs/add/operator/map';

/*
  Generated class for the ParseProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParseProvider {
  private parseAppId: string = "5LxqDEdRueaEKaT2kPTjDCMWMxyf1shxM5A9o6UX";
  private parseServerUrl: string = "https://parseapi.back4app.com/";

  constructor() {
    this.parseInitialize();
  }

  parseInitialize(){
    Parse.initialize("5LxqDEdRueaEKaT2kPTjDCMWMxyf1shxM5A9o6UX","EuMo1fo78hYHrcNd3yraTUHSQ9y4Tw57z93GuDth");
    Parse.serverURL = this.parseServerUrl;
  }


  /*********************** Promos data base ***************************/
  getPromos():Promise<any>{
    console.log("in get promos")
    return new Promise((resolve,reject) => {
       const Promo = Parse.Object.extend("Promo");
       let query = new Parse.Query(Promo);
       console.log("found class")
       query.find().then(function(results){
         resolve(results);
         }, (error) => {
         reject(error);
       });
    });
  }

  getAPromo(id:String):Promise<any>{
    return new Promise((resolve,reject) => {
       const Promo = Parse.Object.extend("Promo");
       let query = new Parse.Query(Promo);
       query.get(id).then(function(results){
         resolve(results);
         }, (error) => {
         reject(error);
       });
    });
  }

  addCommentary(id:String){

  }

  addPromo(newPromo){
    const Promo = Parse.Object.extend("Promo");
    let promo = new Promo();
    promo.set("title", newPromo.title);
    promo.set("price", newPromo.price);
    promo.set("picture", newPromo.picture);
    promo.set("category", newPromo.category);
    promo.set("score", newPromo.score);
    promo.set("lat", newPromo.lat);
    promo.set("long", newPromo.long);
    promo.set("description", newPromo.description);
    promo.set("beginDate", newPromo.dateBegin);
    promo.set("endDate", newPromo.dateEnd);
    promo.set("nameUser", newPromo.nameUser);
    promo.set("commentaryList", newPromo.commentaryList);
    console.log(newPromo.title);
    console.log(newPromo.price);
    console.log(newPromo.picture);
    console.log(newPromo.category);
    console.log(newPromo.nbLikes);
    console.log(newPromo.description);
    promo.save();
  }

  updateApromo(newPromo){
    const Promo = Parse.Object.extend("Promo");
    let promo = new Promo();
    promo.set("objectId", newPromo.id)
    promo.set("title", newPromo.title);
    promo.set("price", newPromo.price);
    promo.set("picture", newPromo.picture);
    promo.set("category", newPromo.category);
    promo.set("score", newPromo.score);
    promo.set("lat", newPromo.lat);
    promo.set("long", newPromo.long);
    promo.set("description", newPromo.description);
    promo.set("beginDate", newPromo.dateBegin);
    promo.set("endDate", newPromo.dateEnd);
    promo.set("nameUser", newPromo.nameUser);
    promo.set("commentaryList", newPromo.commentaryList);
    console.log(newPromo.title);
    console.log(newPromo.price);
    console.log(newPromo.picture);
    console.log(newPromo.category);
    console.log(newPromo.nbLikes);
    console.log(newPromo.nbDislikes);
    console.log(newPromo.description);
    promo.save();
  }

  /******************** User data base ***************************/

  addUser(newUser){
    const User = Parse.Object.extend("user");
    let user = new User();
    user.set("name", newUser.name);
    user.set("password", newUser.password);
    user.set("ListPromoLiked", newUser.ListPromoLiked);
    user.set("ListPromoDisliked", newUser.ListPromoDisliked);
    console.log (newUser.password)
    console.log(newUser.ListPromoDisliked)
    user.save();
  }

  updateUser(newUser){
    const User = Parse.Object.extend("user");
    let user = new User();
    user.set("objectId", newUser.id)
    user.set("name", newUser.name);
    user.set("password", newUser.password);
    user.set("ListPromoLiked", newUser.ListPromoLiked);
    user.set("ListPromoDisliked", newUser.ListPromoDisliked);
    console.log (newUser.password)
    user.save();
  }

  getUsers():Promise<any>{
    return new Promise((resolve,reject) => {
       const User = Parse.Object.extend("user");
       let query = new Parse.Query(User);
       query.find().then(function(results){
         resolve(results);
         }, (error) => {
         reject(error);
       });
    });
  }





}
