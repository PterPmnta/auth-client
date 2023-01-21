import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService){}

  login(){
    console.log(this.loginForm.value);
    const {email, password} = this.loginForm.value;
    this.authService.login(email, password).subscribe((ok) => {
      if(ok){
        this.router.navigateByUrl('/dashboard')
      }else{
        // Crear mensaje de error
      }
    })
  }

}
