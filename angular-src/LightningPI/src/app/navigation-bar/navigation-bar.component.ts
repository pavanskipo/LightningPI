import { Component, OnInit } from '@angular/core';
import { CommonSwitchService } from '../services/common-switch.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  private switchType: string = 'music';
  private searchKey: string = '';

  constructor(private _commonSwitch: CommonSwitchService) { }

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

}
