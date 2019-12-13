import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { VeranstaltungsPopoverPageModule } from './popover/veranstaltungs-popover/veranstaltungs-popover.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from './shared/shared.module';
import { BasicAuthInterceptor } from './intercepters/BasicAuthInterceptor';
import { ErrorInterceptor } from './intercepters/ErrorInterceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    VeranstaltungsPopoverPageModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ReactiveFormsModule, 
    IonicStorageModule.forRoot(), 
    NgxDatatableModule, 
    HttpClientModule, 
    SharedModule, 
    ServiceWorkerModule.register('ngsw-worker.js', 
    { enabled: environment.production })
  ],
  providers: [
    StatusBar,

    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
