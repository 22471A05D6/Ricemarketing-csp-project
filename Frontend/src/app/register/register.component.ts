import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  password: string = '';
  email: string = '';
  users: any[] = [];
  isUpdate: boolean = false;
  message: string = '';
  messageClass: string = '';

  private selectedUserIndex: number = -1;

  register(): void {
    const user = {
      name: this.name,
      password: this.password,
      email: this.email
    };

    this.users.push(user);
    this.showMessage('User registered successfully!', 'success');
    this.clearForm();
  }

  getUsers(): void {
    this.showMessage('Fetched all users.', 'info');
  }

  editUser(user: any): void {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.isUpdate = true;
    this.selectedUserIndex = this.users.indexOf(user);
  }

  updateUser(): void {
    if (this.selectedUserIndex >= 0) {
      this.users[this.selectedUserIndex] = {
        name: this.name,
        password: this.password,
        email: this.email
      };
      this.showMessage('User updated successfully!', 'success');
      this.clearForm();
      this.isUpdate = false;
    }
  }

  deleteUser(user: any): void {
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.users.splice(index, 1);
      this.showMessage('User deleted.', 'warning');
    }
  }

  private clearForm(): void {
    this.name = '';
    this.password = '';
    this.email = '';
    this.selectedUserIndex = -1;
  }

  private showMessage(msg: string, type: string): void {
    this.message = msg;
    this.messageClass = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
