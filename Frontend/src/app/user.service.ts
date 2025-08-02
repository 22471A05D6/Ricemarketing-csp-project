import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3060/data'; 

  constructor(private http:HttpClient) { }


  registerUser(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Insert`, user);
  }

  // Get all users
  getUsers(): Observable<ApiResponse> {
    console.log("i am a service");
    return this.http.get<ApiResponse>(`${this.apiUrl}/Read`);
  }

  // Update an existing user
  updateUser(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/Update`, user);
  }

  // Delete a user
 
  deleteUser(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${name}`);
  }
  

}
