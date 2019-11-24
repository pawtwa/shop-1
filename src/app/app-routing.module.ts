import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from "./components/not-found/not-found.component";


const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import(`./about/about.module`).then(m => m.AboutModule),
    pathMatch: 'full'
  },
  {
    path: 'contact',
    loadChildren: () => import(`./contact/contact.module`).then(m => m.ContactModule),
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import(`./home/home.module`).then(m => m.HomeModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
