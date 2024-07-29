import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxLoadingModule} from 'ngx-loading'

import { LoadingComponent } from '../loading.component';

@NgModule({
  declarations: [
    //LoadingComponent
  ],
  exports:[
    //LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({fullScreenBackdrop:true})
  ]
})
export class LoadingModule { }
