import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  noLogged$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  activeAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
