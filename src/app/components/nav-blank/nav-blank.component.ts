import { WishlistService } from './../../core/service/wishlist.service';
import { CartService } from 'src/app/core/service/cart.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
constructor(private _Router:Router,private _CartService:CartService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}
cartNum:number=0;
wishNum:number=0;
@ViewChild('navBar') navElement!:ElementRef
@HostListener('window:scroll')
onScroll():void{
if(scrollY >300){
  this._Renderer2.addClass(this.navElement.nativeElement , 'px-5')

  this._Renderer2.addClass(this.navElement.nativeElement , 'bg-body-secondary')
  this._Renderer2.addClass(this.navElement.nativeElement , 'shadow')

}else{
  this._Renderer2.removeClass(this.navElement.nativeElement , 'px-5')
  this._Renderer2.removeClass(this.navElement.nativeElement , 'bg-body-secondary')
  this._Renderer2.removeClass(this.navElement.nativeElement , 'shadow')


}

}
ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
console.log('nav',data);
this.cartNum=data;
      }
    })

    this._CartService.getCartUser().subscribe({
      next:(response)=>{
        console.log('nav',response);
        this.cartNum=response.numOfCartItems;

      }
    })

    this._WishlistService.wishListNumber.subscribe({
      next:(data)=>{
console.log('navbar',data);
this.wishNum=data;
      }
    })
    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
this.wishNum=response.data.length;
      }
    })



}
  signOut():void{
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
  }
}
