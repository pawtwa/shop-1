import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';
import {NavComponent} from './components/header/nav/nav.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppInterceptor} from './app-interceptor';

@NgModule({
    declarations: [AppComponent, HeaderComponent, NavComponent, NotFoundComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}],
    bootstrap: [AppComponent],
})
export class AppModule {}
