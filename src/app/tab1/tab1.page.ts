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
    return this.http.get(URL); //Connect to API URL
  }

  ngOnInit(){
    const Brev = this.Breweries;
    this.getAPIdata(this.url)
    .subscribe((data) => {
      Object.keys(data).forEach(function(key) { //Retrieve each object of API data
        Brev.push(data[key]); //Append it to Brev array
      });
    });
  }

  async openBreweryInfos(clickedBreweryID) {
    const modal = await this.modalController.create({ //Open brewery info page
      component: BreweryInfoPage,
      componentProps: {
        BreweryID: clickedBreweryID //Pass data when opening new page
      }
    });
    return await modal.present();
  }

  constructor(private http: HttpClient, private modalController: ModalController, private storage: Storage) {
    storage.get('Connected').then((val) => {});
    storage.get('Connected').then((val) => {
      if(val == 'YES'){ //Check if user is already connected
        document.getElementById('notConnected').style.display = 'none'; //Remove blur layout if connected
        document.getElementById('listID').style.height='auto';
      }
    });
  }

}
