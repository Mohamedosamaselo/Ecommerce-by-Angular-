import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`;

wishListNumber:BehaviorSubject<number>=new BehaviorSubject(0);


addToWishList(id:string):Observable<any>{
  return this._HttpClient.post(this.baseUrl+`wishlist`,
  {
    productId:id 
}
  )
}

getWishList():Observable<any>{
  return this._HttpClient.get(this.baseUrl+`wishlist`);
}



removeWishList(id:string|null):Observable<any>{
  return this._HttpClient.delete(this.baseUrl+`wishlist/${id}`);
}


}
