import { Component, OnInit } from '@angular/core';
import { CommonSwitchService } from '../services/common-switch.service';
import { CommonHttpService } from '../services/common-http.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

  private sourceId: string = '';
  public trackData = {};
  
  public baseUrl;
  public audioSource = 'http://192.168.0.7:8000/music/1323774092_Hello!.mp3';

  constructor(private _commonSwitch: CommonSwitchService,
              private _commonHttp: CommonHttpService) { }

  ngOnInit() {
    console.log("2222---")
    this.sourceId = this._commonSwitch.getSourceId();
    this.fetchData(this.sourceId);
    this._commonSwitch.sourceUpdated.subscribe(
      (Id) => {
        this.sourceId = this._commonSwitch.getSourceId();
        this.fetchData(this.sourceId);
      }
    );
    this.baseUrl = this._commonHttp.getBaseUrl();
  }

  fetchData(sourceId) {
    if(sourceId !== '') {
      let apiUrl = 'music/play_track';
      let query = {};
      query['track_id'] = sourceId;
      this._commonHttp.getJson(apiUrl, query).subscribe((data) => {
        if(data.status === 1){
          this.trackData = data.result;
          this.audioSource = this.baseUrl + this.trackData['track_location'] || '';
        }
      });
    }
  }


}
