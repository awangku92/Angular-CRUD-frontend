import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view-all'     },
  { path: 'view-all'        , component: ViewAllComponent   },
  { path: 'view-user/:id'   , component: ViewUserComponent  },
  { path: 'add-user'        , component: AddUserComponent   },
  { path: 'edit-user/:id'   , component: EditUserComponent  },
  { path: 'delete-user/:id' , component: DeleteUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
