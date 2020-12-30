import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { BreweryInfoPage } from '../brewery-info/brewery-info.page';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  Breweries = [];

  url = 'https://api.openbrewerydb.org/breweries';

  getAPIdata(URL: string) {
    return this.http.get(URL);
  }

  ngOnInit(){
    const Brev = this.Breweries;
    this.getAPIdata(this.url)
    .subscribe((data) => {
      Object.keys(data).forEach(function(key) {
        Brev.push(data[key]);
      });
    });
  }

  async openBreweryInfos(clickedBreweryID) {
    const modal = await this.modalController.create({
      component: BreweryInfoPage,
      componentProps: {
        BreweryID: clickedBreweryID
      }
    });
    return await modal.present();
  }

  constructor(private http: HttpClient, private modalController: ModalController, private storage: Storage) {
    
    storage.get('Connected').then((val) => {
      console.log(val);
    });
    storage.get('Connected').then((val) => {
      if(val == 'YES'){
        document.getElementById('notConnected').style.display = 'none';
        document.getElementById('listID').style.height='auto';
      }
    });
  }

}
