import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonSwitchService {

  constructor() { 
    if(localStorage.getItem('switchType') === 'music') {
      this.switchType = 'music';
      localStorage.setItem('switchType', 'music');
    } else {
      this.switchType = 'movie';
      localStorage.setItem('switchType', 'movie');
    }
  }

  public switchTypeUpdated = new EventEmitter();
  private switchType: string;

  public searchKeyUpdated = new EventEmitter();
  private searchKey: string = '';

  public setSwitchType(type) {
    this.switchType = type;
    localStorage.setItem('switchType', type);
    this.switchTypeUpdated.emit(this.switchType);
  }

  public getSwitchType() {
    return this.switchType;
  }

  public setSearchKey(key) {
    this.searchKey = key;
    this.searchKeyUpdated.emit(this.searchKey);
  }

  public getSearchKey() {
    return this.searchKey;
  }
  

}
