import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/models/role';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  roles = Object.values(Role).filter(role => role !== Role.ADMINISTRATOR);

 registerForm = new FormGroup({
  firstname: new FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$')
    ]),
    lastname: new FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$')
    ]),
    picture: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(6)
    ]),
    role: new FormControl('', [Validators.required])
  });

  private validateDate(control: FormControl): ValidationErrors | null {
    const date = new Date(control.value);
    const today = new Date();
    if (date > today) {
      return { 'futureDate': true };
    }
    return null;
  }

  selectedFile: File | null = null;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  register() {
    const formData = new FormData();

    const addValueToFormData = (key: string, value: any) => {
      if (value != null) {
        formData.append(key, value);
      }
    };

    addValueToFormData('firstname', this.registerForm.get('firstname')?.value);
    addValueToFormData('lastname', this.registerForm.get('lastname')?.value);
    addValueToFormData('email', this.registerForm.get('email')?.value);
    addValueToFormData('password', this.registerForm.get('password')?.value);
    addValueToFormData('role', this.registerForm.get('role')?.value);
    addValueToFormData('verified', this.registerForm.get('verified')?.value);
    if (this.selectedFile) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }

    this.authenticationService.register(formData).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Vous pouvez maintenant vous connecter',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/signin']);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de l\'inscription',
          footer: 'Veuillez réessayer'
        });
      }
    );
  }
}
