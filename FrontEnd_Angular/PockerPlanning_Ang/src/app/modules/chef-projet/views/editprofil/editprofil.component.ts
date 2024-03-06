import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofil',
  templateUrl: './editprofil.component.html',
  styleUrls: ['./editprofil.component.css']
})
export class EditprofilComponent implements OnInit {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  user!: User;
  fileToUpload: Array<File> = [];

  updateForm: FormGroup;

  constructor(private userservice: UserService, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', Validators.required],
      picture: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userconnect;
    this.getUserByid();
  }

  getUserByid() {
    this.userservice.getUserByid(this.userconnect.id).subscribe(data => {
      this.user = data;
      
      this.updateForm.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        picture: this.user.picture,
        email: this.user.email
       
      });
      console.log(this.user);
    });
  }

  update() {
    if (this.updateForm.valid) {
      const update: User = {
        ...this.user,
        ...this.updateForm.value
      };

      this.userservice.update(update).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Information modifiée avec succès',
          showConfirmButton: false,
          timer: 3000
        });
        localStorage.setItem('userconnect', JSON.stringify(res));
        setTimeout(() => {
          window.location.href = "http://localhost:4200/chefProjet/editprofil";
        }, 3000);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la mise à jour',
          text: error.message
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please check your form for errors'
      });
    }
  }

  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
  }

  updateImg() {
    let formData = new FormData();
    formData.append("picture", this.fileToUpload[0]);

    this.userservice.updateImage(this.userconnect.id, formData).subscribe(res => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 750,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      
      Toast.fire({
        icon: 'success',
        title: 'Image modifiée avec succès'
      });

      localStorage.setItem('userconnect', JSON.stringify(res));
      setTimeout(() => {
        window.location.href = "http://localhost:4200/chefProjet/editprofil";
      }, 750);
    }, err => {
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
        icon: 'error',
        title: 'Erreur lors de la mise à jour de l\'image'
      });
    });
  }
}
