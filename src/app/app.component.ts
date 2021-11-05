import { Component, OnInit } from '@angular/core';
import { faBed, faBook, faCog, faDoorOpen, faEnvelope, faMedal, faTools, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';
import { AuthService } from './services/api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  faUser = faUser;
  faBed = faBed;
  faBook = faBook;
  faEmail = faEnvelope;
  faTools = faTools;
  faCog = faCog;
  faDoor = faDoorOpen;

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService,
    public authService: AuthService
    ) {

  }

  ngOnInit() {

  }

  exit() {
    this.authService.setToken();
  }
}
