import { Component, OnInit } from '@angular/core';
import { CommonSwitchService } from '../services/common-switch.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  public switchType: string = 'music';
  public searchKey: string = '';

  constructor(private _commonSwitch: CommonSwitchService,
              private router: Router) { }

  ngOnInit() {
    this.switchType = this._commonSwitch.getSwitchType();
    this._commonSwitch.switchTypeUpdated.subscribe(
      (type) => {
        this.switchType = this._commonSwitch.getSwitchType();
      }
    );
  }

  changeSwitchType(){
    let switchedType = (this.switchType === 'music')?'movie':'music';
    this._commonSwitch.setSwitchType(switchedType);
  }

  setSearchKey(){
    this._commonSwitch.setSearchKey(this.searchKey);
  }

  navigateToRoute(type){
    let route = {
      'music': 'addMusic',
      'movie': 'addMovie',
      'dashboard': 'dashboard'
    }
    this.router.navigate([route[type]]);
  }
}
