import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup'
import { User } from '../model/user.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-create-register',
  templateUrl: './create-register.component.html',
  styleUrls: ['./create-register.component.css']
})
export class CreateRegisterComponent {

public packages = ['mothely','quarterly','daily']
public importantList : string[] = [
  'Toxic fat reduction',
  'Energy and Endurance',
  'Building Musel',
  'fitennes'
]


productForm !: FormGroup;
idNo !: number;
updateActive : boolean = false;
constructor(private fb : FormBuilder,
  private activatedRout : ActivatedRoute,
  private rout : Router,
  private api: ApiService,
  private toast : NgToastService){}

ngOnInit():void{

  this.productForm = this.fb.group({

  fristName : [''],
   lastName : [''],
      email : [''],
      phone : [''],
     height : [''],
     weight : [''],
    trainer : [''],
     gender : [''],
    package : [''],
    gymcond : [''],
        gym : [''],
       date : ['']

  })

  this.activatedRout.params.subscribe(val=>{
      this.idNo=val['id']
      this.api.getRegisterUserId(this.idNo)
      .subscribe(res=>{
        this.updateActive=true;
        this.fillFormToUpdate(res)
      })
  })
 
}

submit(){
  
this.api.postRegistration(this.productForm.value)
.subscribe(res=>{
  this.toast.success({detail:'Success',summary:"User data Insereted",duration:3000})
  this.productForm.reset();;
})
}


update(){

  this.api.updateRegisterUser(this.productForm.value,this.idNo)
  .subscribe(res=>{
  this.toast.success({detail:'Success',summary:"User data Updated",duration:3000})
  this.productForm.reset();
  this.rout.navigate(['list'])
})

}
fillFormToUpdate(user:User){
   this.productForm.setValue({
    fristName : user.fristName,
    lastName : user.lastName,
       email : user.email,
       phone : user.phone,
      height : user.height,
      weight : user.weight,
     trainer : user.trainer,
      gender : user.gender,
     package : user.package,
     gymcond : user.gymcond,
         gym : user.gym,
        date : user.date

   })
}

}
