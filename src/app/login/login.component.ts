import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any = '';
  password: any = '';

  constructor(private router: Router, private state: StateService) { }

  ngOnInit(): void {
    // localStorage.clear()
  }
  login() {
    if (this.email.trim() === 'test@gmail.com' && this.password.trim() === '1234') {
      localStorage.setItem("token", `${Date.now()}`)
      this.router.navigate(['/notes'])
    } else if (this.email.trim() === '' || this.password.trim() === '') {
      this.state.fireAlert('Oops!', 'Please fill all the details and try again', 'warning')
    }
    else {
      this.state.fireAlert('Oops!', 'Something went wrong please try again', 'error')
    }
  }

}
