import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) {

    this.authenticationService.currentUser$.subscribe(
      (userModel: any) => this.loggedIn = userModel != null
    );
  }

  ngOnInit() {

  }

  logoutClick(event: any) {
    event.preventDefault();

    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
}