import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegisterComponent } from './create-register/create-register.component';
import { RegisterListComponent } from './register-list/register-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {path:'', redirectTo:'register', pathMatch:'full'},
  {path:'register', component:CreateRegisterComponent},
  {path:'list', component:RegisterListComponent},
  {path:'detail/:id', component:UserDetailComponent},
  {path:'update/:id',component:CreateRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
