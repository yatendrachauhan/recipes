import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/admin/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  private _logoutSubscription: Subscription = new Subscription();

  constructor(public authService: AuthService, private router: Router) {
    this.isLoggedIn= this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this._logoutSubscription = this.authService.logoutSubject.subscribe(() => {
      this.isLoggedIn = false;
    });
  }

  ngOnDestroy() {
    this._logoutSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/admin/login');
  }

}
