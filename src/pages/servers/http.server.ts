import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService{

    constructor(private http:Http){}
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});
    //get store/commodity/usersetting/others... datas
    getHttpDatas(url:string): Promise<any>{
        return this.http.get(url,{headers: new Headers({ "Accept": "application/json" })})
                .toPromise()
                .then(res => res.json())
                .catch(this.handleError)
    }

   putHttpDatas(url:string,body:any):Promise<any>{
    return this.http.put(url,body, this.options)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

   postHttpDatas(url:string,body):Promise<any>{
    return this.http.post(url, body, this.options)
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError)
  }
   deleteDatas(url:string):Promise<any>{
    return this.http.delete(url)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }
    private handleError(error:any): Promise<any>{
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }

}
