import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentariesPage } from './commentaries';

@NgModule({
  declarations: [
    CommentariesPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentariesPage),
  ],
  exports: [
    CommentariesPage
  ]
})
export class CommentariesPageModule {}
