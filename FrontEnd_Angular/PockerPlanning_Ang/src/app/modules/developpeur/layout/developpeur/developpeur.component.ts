import { Component } from '@angular/core';

@Component({
  selector: 'app-developpeur',
  templateUrl: './developpeur.component.html',
  styleUrls: ['./developpeur.component.css']
})
export class DeveloppeurComponent {
 
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  logout(){
    localStorage.clear()
  }
}
