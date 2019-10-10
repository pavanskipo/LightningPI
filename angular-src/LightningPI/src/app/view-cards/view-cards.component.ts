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

  private baseUrl = this._commonHttp.getBaseUrl();
  public cardsData = [];
  private switchType = '';
  private searchKey = '';
  public detailsObject = {};

  // private popularMusicTags = []
  // private popularMovieTags = []

  private urls = {
    'fetch': ['music/fetch_tracks', 'movie/fetch_movies'],
    'fetch_details': ['music/fetch_track_details', 'movie/fetch_movie_details'],
  }

  public mappingObject = {
    music: {
      id: 'track_id',
      name: 'track_name',
      image: 'track_image',
      location: 'track_location',
      desc: 'track_description',
      tags: 'track_tags',
      created_at: 'created_at'
    },
    movie: {
      id: 'movie_id',
      name: 'movie_name',
      image: 'movie_image',
      location: 'movie_location',
      desc: 'movie_plot',
      tags: 'movie_tags',
      created_at: 'created_at'
    }
  }

  ngOnInit() {
    this.switchType = this._commonSwitch.getSwitchType();
    this.fetchData();
    this._commonSwitch.switchTypeUpdated.subscribe(
      (type) => {
        this.switchType = this._commonSwitch.getSwitchType();
        this.fetchData();
      }
    );
    this._commonSwitch.searchKeyUpdated.subscribe(
      (key) => {
        this.fetchData();
      }
    );
  }

  fetchData(searchQuery?) {
    let apiUrl = this.urls['fetch'][this.switchType === 'music'?0:1];
    let query = {};
    if(searchQuery) {
      query['search_phrase'] = searchQuery;
    } else {
      query['search_phrase'] = this._commonSwitch.getSearchKey();
    }
    this._commonHttp.getTracksJson(apiUrl, query).subscribe((data) => {
      if(data.status === 1){
        this.cardsData = data.result;
      }
    });
  }

  fetchDetails(searchId) {
    let apiUrl = this.urls['fetch_details'][this.switchType === 'music'?0:1];
    let query = {};
    query['track_id'] = searchId;
    this._commonHttp.getTracksJson(apiUrl, query).subscribe((data) => {
      if(data.status === 1){
        this.detailsObject = data.result;
      }
    });
  }

  playTrack() {

  }


}
