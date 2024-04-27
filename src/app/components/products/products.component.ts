import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../core/service/cart.service';
import { ProductService } from './../../core/service/product.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from 'src/app/core/service/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
constructor(private _ProductService:ProductService,private _Renderer2:Renderer2,private _CartService:CartService,private _ToastrService:ToastrService, private _WishlistService:WishlistService){}

total:number=0;
currentPage:number=1;
pageSize:number=0;//limit
products:Product[]=[];
wishListData:string[]=[];
ngOnInit(): void {
  this._ProductService.getProducts().subscribe({
    next:(response) =>{
this.products=response.data;
this.pageSize=response.metadata.limit;
this.currentPage=response.metadata.currentPage;
this.total=response.results;
console.log(response);
    },
    error:(err)=>{
    console.log(err)
    }
  })

  this._WishlistService.getWishList().subscribe({
    next:(response)=>{
      const newData =response.data.map((item:any)=>item._id)
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


  pageChanged(event:any):void{
    this._ProductService.getProducts(event).subscribe({
      next:(response) =>{
  this.products=response.data;
  this.pageSize=response.metadata.limit;
  this.currentPage=response.metadata.currentPage;
  this.total=response.results;
  console.log(response);
      },
      error:(err)=>{
      console.log(err)
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
   this._WishlistService.wishListNumber.next(this.wishListData.length);
    }
  })
}

}
