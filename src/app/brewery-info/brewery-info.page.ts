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
    await this.modalController.dismiss();
  }

  url = 'https://api.openbrewerydb.org/breweries/';

  getAPIdata(URL: string) {
    return this.http.get(URL);
  }

  ngOnInit() {
    var brewery = this.Brewery;
    console.log(this.BreweryID);
    this.getAPIdata(this.url+this.BreweryID.toString())
    .subscribe((data) => {
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
  /* console.log(this.Brewery);
  this.Name = this.Brewery[0].name;
  this.Street = this.Brewery[0].street;
  this.Type = this.Brewery[0].type;
  this.City = this.Brewery[0].city;
  this.State = this.Brewery[0].state;
  this.PostalCode = this.Brewery[0].postal_code;
  this.Country = this.Brewery[0].country;
  this.Phone = this.Brewery[0].phone;
  this.Website = this.Brewery[0].website_url; */
  }
}
