import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new Subject<boolean>();

  constructor() { }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    setTimeout(() => this.isLoading.next(false), 2000)
  }
}
