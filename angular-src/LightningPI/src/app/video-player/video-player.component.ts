import { Component, OnInit } from '@angular/core';
import * as Plyr from 'plyr';
import { CommonSwitchService } from '../services/common-switch.service';
import { CommonHttpService } from '../services/common-http.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  public player; 
  private sourceId: string = '';
  public movieData = {};
  public baseUrl;
  public movieSource = '';

  constructor(private _commonSwitch: CommonSwitchService,
              private _commonHttp: CommonHttpService) { }

  ngOnInit() {
    this.player = new Plyr('#plyrID', { captions: { active: false } });
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
      let apiUrl = 'movie/play_movie';
      let query = {};
      query['movie_id'] = sourceId;
      this._commonHttp.getJson(apiUrl, query).subscribe((data) => {
        if(data.status === 1){
          this.movieData = data.result;
          this.movieSource = this.baseUrl + this.movieData['movie_location'] || '';

        }
      });
    }
  }

}
