import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  constructor( private cookie:CookieService) { }
  Loginform: any; //form

  ngOnInit(){
    this.Loginform = new FormGroup({
      "emailId": new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      // "emailId":  new FormControl(null,[Validators.required,Validators.email]),

      "Password": new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),

    });
  }

  //  Remember me checkbox start 

  setCookie(){
    var e = (document.getElementById('username') as HTMLTextAreaElement).value;
    var p = (document.getElementById('password')as HTMLTextAreaElement).value;

    document.cookie = "emailId =" + e + "; path = http://localhost:4200/login/" 
    document.cookie = "Password =" + p + "; path = http://localhost:4200/login/"

    // document.cookie = "emailId =" + e + "; path: 'login', component: LoginformComponent"
    // document.cookie = "Password =" + p + "; path: 'login', component: LoginformComponent"
  }
  getcookieData() {
    console.log(document.cookie);
    var user = getcookie("emailId");
    var pswd = getcookie('Password');

    var e = (document.getElementById('username') as HTMLTextAreaElement).value;
    var p = (document.getElementById('password') as HTMLTextAreaElement).value;
  }

  getCookie(cname: string) {
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
//  Remember me checkbox End

  // submit function
  // submitData(){
  //   console.log(this.Loginform.value);

  // }
  // submit function
  submitData(){
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

