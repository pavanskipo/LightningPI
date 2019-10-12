import { Component } from '@angular/core';
import { CommonSwitchService } from '../app/services/common-switch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LightningPI';
  private switchType: string = '';
  
  constructor(private _commonSwitch: CommonSwitchService) {
    this.switchType = this._commonSwitch.getSwitchType();
    this._commonSwitch.switchTypeUpdated.subscribe(
      (type) => {
        this.switchType = this._commonSwitch.getSwitchType();
      }
    );
   }

}
