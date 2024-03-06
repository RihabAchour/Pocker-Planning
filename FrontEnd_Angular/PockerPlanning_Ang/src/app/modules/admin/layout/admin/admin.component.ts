import { Component } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {


 
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  logout(){
    localStorage.clear()
  }


}
