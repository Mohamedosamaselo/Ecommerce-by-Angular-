import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

cartNumber:BehaviorSubject<number>= new BehaviorSubject(0);




  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`
addToCart(prodId:string):Observable<any>{
  return this._HttpClient.post(this.baseUrl+`cart`,{
    productId:prodId
  }
  )
}
getCartUser():Observable<any>{
  return this._HttpClient.get(this.baseUrl+`cart`)
}

removeCartItem(id:string):Observable<any>{
  return this._HttpClient.delete(this.baseUrl+`cart/${id}`)
}

updateCartCount(id:string,countNum:number):Observable<any>{
  return this._HttpClient.put(this.baseUrl+`cart/${id}`,
  {
    count:countNum
  }
  )
}



clearCart():Observable<any>{
  return this._HttpClient.delete(this.baseUrl+`cart`)
}

checkOut(id:string|null,orderInfo:object):Observable<any>{
  return this._HttpClient.post(this.baseUrl+`orders/checkout-session/${id}?url=http://localhost:4200`,
  {
    shippingAddress:orderInfo
}
  
  
  )

}


}
