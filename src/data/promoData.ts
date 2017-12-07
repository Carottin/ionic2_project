import { CommentaryData} from '../data/commentaryData';

export class PromoData {
  id : string;
  category : string;
  title : string;
  price : number;
  picture : string;
  hour : string;
  score:number;
  dateBegin : Date;
  dateEnd : Date;
  distance : number;
  lat : number;
  long : number;
  timeAdded : number;
  description:string;
  idUser:string;
  commentaryList:Array<CommentaryData>;
  dateType:string;

  constructor (){
    this.category = null;
    this.lat = null;;
    this.long = null;
    this.timeAdded=null;
    this.id = null;
    this.title = null;
    this.price = null;
    this.picture=null;
    this.hour=null;
    this.score=0;
    this.distance = null;
    this.description=null;
    this.dateEnd=null;
    this.dateBegin=null;
    this.idUser=null;
    this.commentaryList=new Array();
  }
}
