import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolbarComponent }   from './toolbar/toolbar.component';
import { LogInPageComponent }   from './log-in-page/log-in-page.component';
import { SidebarComponent }   from './sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'log-in-page', component: LogInPageComponent },
  { path: 'home', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
