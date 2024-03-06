import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginPayload } from '../models/login-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(formData: FormData) {
    return this.http.post(`${environment.baseUrl}/auth/register`, formData);
  }

  login(user: LoginPayload) {
    return this.http.post(`${environment.baseUrl}/auth/login`, user);
  }

  forgetPassword(email: string) {
    return this.http.post(`${environment.baseUrl}/auth/forgetpassword?email=${email}`,{});
  }

  resetPassword(passwordResetToken: string, newPassword: string) {
    return this.http.post(`${environment.baseUrl}/auth/resetPassword/${passwordResetToken}?newPassword=${newPassword}`, {});
  }
}
