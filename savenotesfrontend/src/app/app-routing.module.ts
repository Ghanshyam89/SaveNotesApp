import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { AddNoteComponent } from './add-note/add-note.component';

const routes: Routes = [
  {
    component: DashboardComponent,
    path:''
  },
  {
    component: LoginComponent,
    path:'login'
  },
  {
    component: RegisterComponent,
    path:'register'
  },
  {
    component: DashboardComponent,
    path: 'dashboard'
  },
  {
    component: AddNoteComponent,
    path: 'add-note'
  },
  {
    component: PageNotFoundComponent,
    path:'**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
