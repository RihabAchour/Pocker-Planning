import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  update(user: User) {
    return this.http.put(`${environment.baseUrl}/user/update`, user);
  }

  getUserByid(id: number) {
    return this.http.get<User>(`${environment.baseUrl}/user/${id}`);
  }
  
 /* updatePassword(id:number , password:string){
    return this.http.put(`${environment.baseUrl}/user/updatePassword/${id}/${password}`, {})
  }*/

  updateImage(id:number , newImage:any){
    return this.http.put(`${environment.baseUrl}/user/updateImage/${id}`, newImage)
  }
  getProjectmanager(){
    return this.http.get<User[]>(`${environment.baseUrl}/user/projectmanager`);
  }
  getDeveloper(){
    return this.http.get<User[]>(`${environment.baseUrl}/user/developer`);
  }

  deactivateUser(userId: number) {
    return this.http.put(`${environment.baseUrl}/user/${userId}/deactivate`, {});
  }
  activateUser(userId: number) {
    return this.http.put(`${environment.baseUrl}/user/${userId}/activate`, {});
  }
}
