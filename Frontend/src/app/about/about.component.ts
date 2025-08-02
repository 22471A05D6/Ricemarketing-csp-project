import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { ApiResponse } from '../api-response.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  users: any[] = [];
  isUpdate: boolean = false;
  message: string = '';
  messageClass: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  register(): void {
    const user = { name: this.name, email: this.email, password: this.password };
    this.userService.registerUser(user).subscribe(
      response => {
        //this.message = 'User registered successfully!';
        this.messageClass = 'alert-success';
        this.getUsers();
      },
      error => {
        this.message = 'Failed to register user!';
        this.messageClass = 'alert-danger';
      }
    );
  }

  getUsers():void {
    console.log('getUsers method called'); 
    this.userService.getUsers().subscribe(
      
      (res: ApiResponse) => {
        console.log('Fetch users response:', res); // Debug log
        this.users =  res.Result.map((row: [string, string, string]) => ({
          name: row[0],
          email: row[2],
          password: row[1]
        })); // Note: accessing the `result` property
        console.log('Users array:', this.users); 
      },
      error => console.error('Error fetching users', error)
    );
  }

  editUser(user: any): void {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.isUpdate = true;
  }

  updateUser(): void {
    const user = { name: this.name, email: this.email, password: this.password };
    this.userService.updateUser(user).subscribe(
      response => {
        this.message = 'User updated successfully!';
        this.messageClass = 'alert-success';
        this.getUsers();
        this.resetForm();
      },
      error => {
        this.message = 'Failed to update user!';
        this.messageClass = 'alert-danger';
      }
    );
  }

  deleteUser(name: string): void {
    this.userService.deleteUser(name).subscribe(
      response => {
       // this.message = 'User deleted successfully!';
        this.messageClass = 'alert-success';
        this.getUsers();
      },
      error => {
        this.message = 'Failed to delete user!';
        this.messageClass = 'alert-danger';
      }
    );
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.isUpdate = false;
  }
 

  
}
