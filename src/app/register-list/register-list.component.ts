import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import {User} from '../model/user.model'
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})
export class RegisterListComponent implements OnInit{
  displayedColumns : string[] = ['id', 'fristName', 'lastName', 'email','phone','height','weight','trainer','gym','date','action'];/* ,'gender','package','gymcond' */

  public dataSource !: MatTableDataSource<User>;
  public users !: User[];
  idNo !: number;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

 constructor(private api : ApiService,
  private activatedRout:ActivatedRoute,
  private route:Router,
  private confirm : NgConfirmService,
  private toast : NgToastService){}

 ngOnInit():void{
  this.getAllRegisterUser();
 }

  getAllRegisterUser(){
  
     this.api.getRegisterUser()
     .subscribe(res=>{
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     })
      
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  edit(id:number){

    this.route.navigate(['update',id]) 
  }

  delete(id:number, name:string, fname:string){
    this.confirm.showConfirm(`Are you Sure you went to delete User" ${name} ${fname} "`,()=>{
      this.api.deleteRegisterUser(id)
      .subscribe((res)=>{
        this.toast.success({detail:'Success',summary:"User data Deleted",duration:3000})
        this.getAllRegisterUser(); 
      })
    },
    ()=>{

    }
    )
    
  }

}
