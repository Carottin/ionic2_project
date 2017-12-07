export class CommentaryData {
  text:string;
  addDate : Date;
  userName:string;
  timeAdded : number;
  score:number;


  constructor (){
    this.addDate=null;
    this.text=null;
    this.userName=null;
    this.timeAdded=null;
    this.score=0;
  }
}
