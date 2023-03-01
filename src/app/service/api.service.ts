import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl : string ='http://localhost:3000/data'
  constructor(private http : HttpClient) { }

  postRegistration(Obj : User){
    return this.http.post<User>(`${this.baseUrl}`,Obj)
}

getRegisterUser(){
   return this.http.get<User[]>(`${this.baseUrl}`)
}

updateRegisterUser(Obj:User,id:number){
    return this.http.put<User>(`${this.baseUrl}/${id}`,Obj)
}

deleteRegisterUser(id:number){
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
}

getRegisterUserId(id:number){
    return this.http.get<User>(`${this.baseUrl}/${id}`)
}

}
