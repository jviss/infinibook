import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardCommunicationService {

  componentLevel:number = 0;

  constructor() { }

  incComponentLevel() {
    this.componentLevel++;
  }

  decComponentLevel() {
    this.componentLevel++;
  }

  getComponentLevel() {
    return this.componentLevel;
  }
}
