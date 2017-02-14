import { Pipe, PipeTransform } from "angular/core";
import { Injectable } from '@angular/core';
@Pipe({
  name: "OrderBy",
  pure: false
})
@Injectable()
export class OrderBy{

  direction:number;
  key:string;

  constructor(){
    this.direction = 1;
  }

  sort(key:string,data:any[]){

    if(this.key === key){
      this.direction = -this.direction;
    }
    else{
      this.direction = 1;
    }

    this.key = key;

    data.sort((a,b) => {
      if(a[key] === b[key]){
        return 0;
      }
      else if(a[key] > b[key]){
        return this.direction;
      }
      else{
        return -this.direction;
      }
    });
  }

}
