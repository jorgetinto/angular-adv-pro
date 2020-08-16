import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  // paths: '/dahboard' PagesRouting
  // paths: '/auth' AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AppRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
