import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  
  constructor() { }
  Loginform:any; //form
 
  ngOnInit(): void {
    this.Loginform = new FormGroup({
      "emailId":  new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      // "emailId":  new FormControl(null,[Validators.required,Validators.email]),
       
      "Password":  new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      
    });
  }

  // submit function
  // submitData(){
  //   console.log(this.Loginform.value);

  // }
    // submit function
    submitData(){
      console.log(this.Loginform.value);
  
  
      if(this.Loginform.valid){
        alert(`Login Successfully`);
        this.Loginform.reset();  // reset form value
      }
  
  
    }




  get emailid() { return this.Loginform.get('emailId'); } //emailId
  get password() { return this.Loginform.get('Password'); } //password
}