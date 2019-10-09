import { Component, OnInit } from '@angular/core';
import { CommonSwitchService } from '../services/common-switch.service';
import { CommonHttpService } from '../services/common-http.service';


@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.css']
})
export class ViewCardsComponent implements OnInit {

  constructor(private _commonSwitch: CommonSwitchService, 
              private _commonHttp: CommonHttpService) { }

  ngOnInit() {
    this._commonHttp.getTracksJson('music/fetch_tracks', {}).subscribe((data: {}) => {
      console.log(data);
    });
  }

}
