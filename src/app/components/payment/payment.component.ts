import { CartService } from 'src/app/core/service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

constructor(private _ActivatedRoute:ActivatedRoute,private _CartService:CartService ){}
cartId:string | null='';

orderForm:FormGroup=new FormGroup({
  details:new FormControl(''),
  phone:new FormControl(''),
  city:new FormControl('')

})

handleForm():void{
  console.log(this.orderForm.value);
  const orderData=this.orderForm.value;
  this._CartService.checkOut(this.cartId,orderData).subscribe({
    next:(response)=>{
if(response.status === 'success'){
  window.open(response.session.url,'_self');
}
    }
  })
}

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
console.log(param.get('id'));
this.cartId=param.get('id');
        }
      })
  }


}
