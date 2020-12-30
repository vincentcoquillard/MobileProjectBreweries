import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brewery-info',
  templateUrl: './brewery-info.page.html',
  styleUrls: ['./brewery-info.page.scss'],
})

export class BreweryInfoPage implements OnInit {

  constructor(private http: HttpClient, private modalController: ModalController) { }

  @Input() public BreweryID: number;

  Brewery = [];

  Name: String;
  Type: String;
  Street: String;
  City: String;
  State: String;
  PostalCode: String;
  Country: String;
  Phone: String;
  Website: String;

  async closeModal() {
    await this.modalController.dismiss(); //Close the page
  }

  url = 'https://api.openbrewerydb.org/breweries/'; //API URL corresponding to brewery informations

  getAPIdata(URL: string) {
    return this.http.get(URL); //Get API data with URL
  }

  ngOnInit() {
    var brewery = this.Brewery;
    this.getAPIdata(this.url+this.BreweryID.toString())
    .subscribe((data) => { //Push data into brewery variable
      brewery.push({
      name: data['name'], 
      type: data['brewery_type'],
      street: data['street'], 
      city: data['city'], 
      state: data['state'], 
      postalcode: data['postal_code'], 
      country: data['country'], 
      phone: data['phone'], 
      website: data['website_url']
    });
  });
  }
}
