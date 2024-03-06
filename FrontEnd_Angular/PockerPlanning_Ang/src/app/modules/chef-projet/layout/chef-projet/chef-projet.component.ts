import { Component } from '@angular/core';

@Component({
  selector: 'app-chef-projet',
  templateUrl: './chef-projet.component.html',
  styleUrls: ['./chef-projet.component.css']
})
export class ChefProjetComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  logout(){
    localStorage.clear()
  }
}
