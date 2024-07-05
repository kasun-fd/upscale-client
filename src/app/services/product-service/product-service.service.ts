import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  baseUrl = environment.baseUrl;

  searchText:any;

  constructor(private http:HttpClient) { }

  getAll(searchText:any,page:any,size:any):Observable<any>{

    // const url = `${this.baseUrl}products/list?searchText=${searchText}&page=${page}&size=${size}`;
    let params = new HttpParams();
    params = params.append('searchText',searchText)
    params = params.append('page',page)
    params = params.append('size',size)
    return this.http.get(this.baseUrl+'products'+"/list",{params:params});
    // return this.http.get(url);

  }

}
