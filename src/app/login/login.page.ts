import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { User } from '../shared/user';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  constructor(private router: Router,
    private modalCtrl: ModalController,
    private autSvc: AuthserviceService) { }

  ngOnInit() {
  }

  
  async onLogin(){
    const user = await this.autSvc.onLogin(this.user);
    if(user!=null && user.code ==undefined){
      console.log('Successfully logged in!');
      this.router.navigate(['/home']);
    }
    else{
      if(user.code){
        if(user.code=='auth/wrong-password' || user.code =='auth/invalid-email' || user.code=='auth/argument-error'){
          this.openModal(user);
        }
      }
    }
  }

  async openModal(user: any){
    const modal = await this.modalCtrl.create({
      component: ModalErrorComponent,
      componentProps:{
        error: 'Ingres password y/o contraseña'
      }
    });
    return await modal.present();
  }
}
