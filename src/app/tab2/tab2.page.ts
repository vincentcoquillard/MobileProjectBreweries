import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  Username;
  Password;


  constructor(public alertController: AlertController, private storage: Storage) {
    storage.get('Connected').then((val) => {
      if(val == 'NO' || val == undefined){
        document.getElementById('login').style.display = 'block';
      }else{
        document.getElementById('alreadylogged').style.display = 'block';
      }
    });
  }

  Disconnect(){
    this.storage.set('Connected', 'NO');
    this.storage.get('Connected').then((val) => {
      
    });
    document.location.href="/";
  }

  LoginMethod(){
    const sto = this.storage;
    if(this.Username == undefined || this.Password == undefined){
      this.presentAlert();
    }else{
      const username = this.Username;
      const password = this.Password;
      let db = firebase.default.firestore();
      db.collection("Users").where("Username", "==", username).where("Password", "==", password).get().then(function(querySnapshot) {
        if(querySnapshot.empty){
          document.getElementById('error').style.display = "block";
        }
        querySnapshot.forEach(function(doc) {
            sto.set('Connected', 'YES');
            document.location.href="/";
        });
      })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }
  }

  RegistrationMethod(){
    const sto = this.storage;
    if(this.Username == undefined || this.Password == undefined){
      this.presentAlert();
    }else{
      const username = this.Username;
      const password = this.Password;
      let db = firebase.default.firestore();

      db.collection("Users").where("Username", "==", username).get().then(function(querySnapshot) {
        if(querySnapshot.empty){ //Check if there is already a user with same username    
          db.collection("Users").add({
            Username: username,
            Password: password
          }).then(function() {
            sto.set('Connected', 'YES');
            document.location.href="/";
          });
        }else{
          document.getElementById('sameusernameerror').style.display='block';
        }
      })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Oups',
      message: 'You must type a Username AND a Password.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit(){
  }

}
