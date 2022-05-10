import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {

  constructor() { }
  registerForm:any; //form
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "firstName":  new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z]*')]),
      "lastName":  new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z]*')]),
      // "emailId":  new FormControl(null,[Validators.required,Validators.email]),
      "emailId":  new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "mobileNumber":  new FormControl(null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    });
  }

  // submit function
  submitData(){
    console.log(this.registerForm.value);


    if(this.registerForm.valid){
      alert(`Thank You ${this.registerForm.value.firstName} `);
      this.registerForm.reset();  // reset form value
    }


  }

  get firstname() { return this.registerForm.get('firstName') } //firstName
  get lastname() { return this.registerForm.get('lastName') } //lastName
  get emailid() { return this.registerForm.get('emailId'); } //emailId
  get mobilenumber() { return this.registerForm.get('mobileNumber'); } //mobilenumber
}