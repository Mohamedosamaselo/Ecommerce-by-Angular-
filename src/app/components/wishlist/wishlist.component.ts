import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from './../../core/service/wishlist.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  
  products:Product[]=[];
wishListData:string[]=[];
  constructor(private  _WishlistService:WishlistService,private _ToastrService:ToastrService,private _Renderer2:Renderer2,private _CartService:CartService){}
  ngOnInit(): void {
      this._WishlistService.getWishList().subscribe({
        next:(response)=>{
console.log(response);
this.products=response.data;
const newData=response.data.map((item:any)=> item._id);
this.wishListData=newData;
        }
      })
  }


  
addProduct(id:string,element:HTMLButtonElement):void{

  this._Renderer2.setAttribute(element,'disabled','true')
  
  
    this._CartService.addToCart(id).subscribe({
    next:(response)=>{
  console.log(response);
  this._ToastrService.success(response.message);
  this._Renderer2.removeAttribute(element,'disabled')
  this._CartService.cartNumber.next(response.numOfCartItems);
  
  },
  error:(err)=>{
    this._Renderer2.removeAttribute(element,'disabled')
  }
  })
  }


  addFav(id:string):void{
    this._WishlistService.addToWishList(id).subscribe({
      next:(response)=>{
    console.log(response);
    this._ToastrService.success(response.message);
    this.wishListData=response.data;  
    this._WishlistService.wishListNumber.next(this.wishListData.length);
    }
    })
    }
    
    removeFav(id:string|null):void{
      this._WishlistService.removeWishList(id).subscribe({
        next:(response)=>{
          console.log(response);
          this._ToastrService.success(response.message);
       this.wishListData=response.data;
       this._WishlistService.wishListNumber.next(this.wishListData.length)

       const newProductData = this.products.filter((item)=> (this.wishListData.includes(item._id)))
      this.products=newProductData;  
      }
      })

    }
}
