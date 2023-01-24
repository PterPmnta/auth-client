import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService){}

  register(){
    const {name, email, password} = this.registerForm.value;
    this.authService.userRegister(name, email, password).subscribe((resp) => {
      if(!resp.hasOwnProperty('msg')){
        this.router.navigateByUrl('/dashboard')
      }else{
        Swal.fire('Error', resp.msg, 'error');
      }
    })
  }

}
