import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UsernameValidator } from 'src/app/pages/register/username.validator';
import { PasswordValidator } from 'src/app/pages/register/password.validator';
import { PhoneValidator } from 'src/app/pages/register/phone.validator';
import { CountryPhone } from 'src/app/models/country-phone.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDTO } from 'src/app/api/models';
import { UserControllerService } from 'src/app/api/services';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;
  responseData: any;
  userData = { 'username': '', 'password': '', 'name': '', 'email': '' };

  constructor(private alertController: AlertController, private userController:UserControllerService, public formBuilder: FormBuilder, private router: Router, private alertService: AlertService, private http: HttpClient) { }

  ngOnInit() {
   // this.onSubmit();
    this.countries = [
      new CountryPhone('DE', 'Germany'),
    ];


    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])||(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      matching_passwords: this.matching_passwords_group,
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country_phone: this.country_phone_group,
      // rolle: new FormControl('', Validators.required),
      // nameChild: new FormControl('', Validators.required),
      // lastnameChild: new FormControl('', Validators.required),
      // birthday: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^[0-9]{2}[\.]{1}[0-9]{2}[\.]{1}[0-9]{4}$')
      //   //Validators.pattern('^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$')
      // ])),
      // school: new FormControl('', Validators.required),
      // schoolClass: new FormControl('', Validators.required)
    });
  }



  validation_messages = {
    'username': [
      { type: 'required', message: 'Nutzername muss angegeben werden.' },
      { type: 'minlength', message: 'Nutzername muss mind. 5 Zeichen lang sein.' },
      { type: 'maxlength', message: 'Nutzername darf nicht länger als 25 Zeichen sein.' },
      { type: 'pattern', message: 'Nutzername darf nur aus Zahlen oder Buchstaben bestehen.' },
      { type: 'validUsername', message: 'Nutzername ist bereits vergeben.' }
    ],
    'password': [
      { type: 'required', message: 'Passwort wird benötigt.' },
      { type: 'minlength', message: 'Passwort muss mind. 5 Zeichen lang sein.' },
      { type: 'pattern', message: 'Passwort muss mind. einen Großbuchstaben, einen Kleinbuchstaben und eine Nummer beinhalten.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Passwortbestätigung ist notwendig' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Passwort stimmt nicht überein.' }
    ],
    'name': [
      { type: 'required', message: 'Vorname ist notwendig.' }
    ],
    'lastname': [
      { type: 'required', message: 'Nachname ist notwendig.' }
    ],
    'email': [
      { type: 'required', message: 'Email ist notwendig.' },
      { type: 'pattern', message: 'Gib eine gültige Email ein.' }
    ],
    'phone': [
      { type: 'required', message: 'Telefonnummer ist notwendig.' },
      { type: 'validCountryPhone', message: 'Keine gültige Telefonnummer.' }
    ],
    'rolle': [
      { type: 'required', message: 'Rolle muss ausgewählt werden.' },
    ],
    'nameChild': [
      { type: 'required', message: 'Name ist notwendig.' }
    ],
    'lastnameChild': [
      { type: 'required', message: 'Nachname ist notwendig.' }
    ],
    'birthday': [
      { type: 'required', message: 'Geburtstag ist notwendig.' },
      { type: 'pattern', message: 'Datum muss im Format TT.MM.JJJJ angegeben werden.' }
    ],
    'school': [
      { type: 'required', message: 'Schule ist notwendig.' },
    ],
    'schoolClass': [
      { type: 'required', message: 'Klasse ist notwendig.' },
    ],
  };

  onSubmit() {
    let fullname = this.validations_form.get('name').value + ' ' + this.validations_form.get('lastname').value;
    let username = this.validations_form.get('username').value;
    let phoneNumber = this.country_phone_group.get('phone').value;
    let email = this.validations_form.get('email').value;
    let password = this.matching_passwords_group.get('password').value;
    const userDTO = <UserDTO> {
      "userType":"PARENT",
      "username": username,
      "password": password,
      "email": email,
      "fullname": fullname,
      "schoolClass":"",
      "phoneNumber":phoneNumber,
      "subject":"",
      "iban":"",
      "address":"", 
      "isSchoolCoordinator" : false
    }
    const params = {
      "userDTO": userDTO
    }
    this.userController.registrationUsingPOST(params).toPromise().then((response)=>{
      this.registerFeedback();
    }).catch((error)=>{
      console.log(error);
      this.alertService.presentToastFailure("Registrierung fehlgeschlagen");
      this.router.navigateByUrl('login');
    });
  }

  async registerFeedback(){
    const alert = await this.alertController.create({
      header: "Registrierung erfolgreich",
      message: "Sie erhalten in Kürze eine Bestätigungs-E-Mail mit einem persönlichen Link. Nach erfolgreicher Bestätigung können Sie unseren Service nutzen.",
      buttons: [{text: 'OK',
                handler: ()=> {
                  this.router.navigateByUrl('login');
                },
              }]
    });
    await alert.present();

  }

  login() {

    this.router.navigateByUrl('/login');
  }




}
