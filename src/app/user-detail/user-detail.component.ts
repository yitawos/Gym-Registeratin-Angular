import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

idNo!: number;
userData !: User;

constructor(private api : ApiService,private activetRout : ActivatedRoute){}

ngOnInit():void{

  this.activetRout.params.subscribe(res=>{
    this.idNo = res['id']
    this.fetchData(this.idNo)
  })

}

fetchData(id : number){

  this.api.getRegisterUserId(id)
  .subscribe(res=>{
    this.userData=res;
  })

}

}
