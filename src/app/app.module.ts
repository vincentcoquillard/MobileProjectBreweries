import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import * as firebase from 'firebase';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';


declare var require: any;

//const firebase = require('firebase');

firebase.default.initializeApp({
  apiKey: "AIzaSyCQpadgcRqehCPIxM4Uepe--jBXIM0ef1k",
  authDomain: "mobileappproject2020-b4f61.firebaseapp.com",
  projectId: "mobileappproject2020-b4f61",
  storageBucket: "mobileappproject2020-b4f61.appspot.com",
  messagingSenderId: "939340574504",
  appId: "1:939340574504:web:67d1918ba1a67869edea1d",
  measurementId: "G-NPYWXXNL2R"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {}
