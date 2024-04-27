import { WishlistService } from './../../core/service/wishlist.service';
import { ProductService } from './../../core/service/product.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, Product } from 'src/app/core/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttextPipe,CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
constructor(private _ProductService:ProductService,private _CartService:CartService, private _ToastrService:ToastrService, private _Renderer2:Renderer2,private _WishlistService:WishlistService){}
term:string=''
products:Product[]=[];
categories:Category[]=[];
wishListData:string[]=[];

ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(response) =>{
this.products=response.data;
      },
      error:(err)=>{
      console.log(err)
      }
    })


  this._ProductService.getCategories().subscribe({
    next:(response)=>{
console.log(response);
this.categories=response.data;    

    }
  })

  this._WishlistService.getWishList().subscribe({
    next:(response)=>{
console.log('wishlist',response.data);
const newData =response.data.map((item:any)=>item._id);
console.log('newData',newData);
this.wishListData=newData;
    }
  })
}


categoryOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  autoplay:true,

  autoplayTimeout:3000,
  autoplaySpeed:700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 3
    },
    740: {
      items: 4
    },
    940: {
      items: 6
    }
  },
  nav: false
}


mainSlideOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  autoplay:true,
  autoplayTimeout:2000,
  autoplaySpeed:500,
  navText: ['', ''],
 items:1,
  nav: false
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
   this._WishlistService.wishListNumber.next(this.wishListData.length);
    }
  })
}


}
