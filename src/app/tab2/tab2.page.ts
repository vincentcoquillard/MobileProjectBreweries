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
    storage.get('Connected').then((val) => { //Check if user is already connected
      if(val == 'NO' || val == undefined){
        document.getElementById('login').style.display = 'block'; //Show login form
      }else{
        document.getElementById('alreadylogged').style.display = 'block'; //Show disconnect button
      }
    });
  }

  Disconnect(){
    this.storage.set('Connected', 'NO'); //Save in local variable that user is not connected
    this.storage.get('Connected').then((val) => {});
    document.location.href="/"; //Restart app with disconnected status
  }

  LoginMethod(){
    const sto = this.storage;
    if(this.Username == undefined || this.Password == undefined){
      this.presentAlert(); //Show alert error if at least one field is empty
    }else{
      const username = this.Username;
      const password = this.Password;
      let db = firebase.default.firestore();
      db.collection("Users").where("Username", "==", username).where("Password", "==", password).get().then(function(querySnapshot) {
        if(querySnapshot.empty){
          document.getElementById('error').style.display = "block"; //There exists no corresponding account to the username and password
        }
        querySnapshot.forEach(function(doc) {
            sto.set('Connected', 'YES'); //Save in local variable that user is connect
            document.location.href="/"; //Restart app with connected status
        });
      })
    .catch(function(error) {
        console.log("Error getting documents: ", error); //Error when accessing to database
    });
    }
  }

  RegistrationMethod(){
    const sto = this.storage;
    if(this.Username == undefined || this.Password == undefined){
      this.presentAlert(); //Show alert error if at least one field is empty
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
            sto.set('Connected', 'YES'); //Save in local variable that user is connect
            document.location.href="/"; //Restart app with connected status
          });
        }else{
          document.getElementById('sameusernameerror').style.display='block'; //Show error if a user has same username
        }
      })
    .catch(function(error) {
        console.log("Error getting documents: ", error); //Error when accessing to database
    });
    }
  }

  async presentAlert() { //Show an alert for an error
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
