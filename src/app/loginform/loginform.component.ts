import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { pathToFileURL } from 'url';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  f: any;

  constructor(private cookie: CookieService) { }
  Loginform: any; //form

  ngOnInit() {
    this.Loginform = new FormGroup({
      "emailId": new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      // "emailId":  new FormControl(null,[Validators.required,Validators.email]),

      "Password": new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),

    });
    this.checkCookie();
  }

  //  Remember me checkbox start 



  setCookie(cname: any, cvalue: any, exdays: any, path: any) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
  }

  getCookie(cname: any) {
    var name = cname + "=";
    var decodedcookie = decodeURIComponent(document.cookie);
    var ca = decodedcookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == '') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  checkCookie() {
    let user = this.getCookie("username");
    let password = this.getCookie("password");

    // password decrypt
    let reverse = atob(password);
    let splitvalue = reverse.split("%");
    var deCryptpassword: any;
    var deTransform: any = [];

    splitvalue.forEach((value: any) => {
      let math = (parseInt(value) + 6) / 12;
      deTransform.push(math);
      let joinVal = deTransform.json();
      deCryptpassword = joinVal.replace(/,/g, '');
    });

    if (user != '' && password != '') {
      (document.getElementById("remeberme") as HTMLInputElement).checked = true;
      this.Loginform.setValue({
        username: user,
        password: deCryptpassword
      });

    } else {
      (document.getElementById("remeberme") as HTMLInputElement).checked = false;
      this.Loginform.setValue({
        username: '',
        password: ''
      });
    }

  }
  RememberMe() 
  {
    let checkMe = document.getElementById('rememberme') as HTMLInputElement;
    let data = checkMe!.checked;
    if (data) 
    {
      const path = environment.baseurlCookie;

      const username: any = this.f.username.value;
      const password: any = this.f.password.value;

      let arrFromStrPass = [...password];

      var enCryptpassword: any;
      var enTransform: any = [];
      arrFromStrPass.forEach((value: any) => 
      {
        let final = (value * 12) - 6;
        enTransform.push(final);
        enCryptpassword = btoa(enTransform.json('%'));
      
      });
      if ((username && enCryptpassword) != ('' || undefined || null || '')) 
      {
        this.setCookie("username", username, 30, path);
        this.setCookie("password", enCryptpassword, 30, path);
      }
    } else {
      document.cookie = 'username="";expires=Thu, 01 jan 1970 00:00:01 GMT;';
      document.cookie = 'password="";expires=Thu, 01 jan 1970 00:00:01 GMT;';
    }
  }



  //  Remember me checkbox End

  // submit function
  // submitData(){
  //   console.log(this.Loginform.value);

  // }
  // submit function
  submitData() {
    console.log(this.Loginform.value);

    if (this.Loginform.valid) {
      alert('Login Successfully');
      this.Loginform.reset();  // reset form value
    }

  }


  get emailid() { return this.Loginform.get('emailId'); } //emailId
  get password() { return this.Loginform.get('Password'); } //password
}

function emailId(emailId: any) {
  throw new Error('Function not implemented.');
}
function getcookie(Password: string) {
  throw new Error('Function not implemented.');
}

