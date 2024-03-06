import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPayload } from 'src/app/core/models/login-payload';
import { Role } from 'src/app/core/models/role';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(private router: Router, private authenticationService: AuthenticationService) { }
  login() {
    const payload: LoginPayload = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    };

    this.authenticationService.login(payload).subscribe((res: any) => {
      console.log(res);

      if (res && res.userDetails && res.userDetails.enabled) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Connexion réussie'
        });

        localStorage.setItem('userconnect', JSON.stringify(res.userDetails));
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem("state", "0");

        if (res.userDetails.role === Role.ADMINISTRATOR) {
          this.router.navigateByUrl('/admin/list-chefprojet');
        } else if(res.userDetails.role === Role.PROJECTMANAGER) {
          this.router.navigateByUrl('/chefProjet');
        }else{
          this.router.navigateByUrl('/developpeur');
        }
   }
  }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Login failed. Please check your credentials.',
        showConfirmButton: true
      });
    });
  }
}
