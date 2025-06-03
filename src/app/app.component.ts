import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'MoviesApp';

  isLoginPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage =
          event.urlAfterRedirects === '/login' ||
          event.urlAfterRedirects === '/register';
      });
  }
}
