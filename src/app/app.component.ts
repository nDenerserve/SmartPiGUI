
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/services';
import { User } from '@app/models';
import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  nodelocation = window.location.protocol + '//' + window.location.hostname + ':1880';
  networklocation = window.location.protocol + '//' + window.location.hostname + ':8080';
  grafanalocation = window.location.protocol + '//' + window.location.hostname + ':3000';

  currentUser: User;

  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  // overlap = false;

  watcher: Subscription;

  constructor(mediaObserver: MediaObserver, private authenticationService: AuthenticationService) {
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  login(userName: string, password: string) {
    this.authenticationService.login(userName, password);
  }

  logout() {
    this.currentUser = null;
    this.authenticationService.logout();
  }

  ngOnInit() {

  }

}