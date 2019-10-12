import { Component, OnInit } from '@angular/core';
import { CommonSwitchService } from '../services/common-switch.service';
import { CommonHttpService } from '../services/common-http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.css']
})
export class ViewCardsComponent implements OnInit {

  constructor(private _commonSwitch: CommonSwitchService, 
              private _commonHttp: CommonHttpService,
              private toastr: ToastrService
              ) { }
  private baseUrl = this._commonHttp.getBaseUrl();
  public cardsData = [];
  private switchType = '';
  private searchKey = '';
  public detailsObject = {
    created_at: {type: "2019-10-09T07:25:42.237Z"},
    track_description: "",
    track_id: "",
    track_image: "",
    track_location: "",
    track_name: "",
    track_tags: []
  };

  // private popularMusicTags = []
  // private popularMovieTags = []

  private urls = {
    'fetch': ['music/fetch_tracks', 'movie/fetch_movies'],
    'fetch_details': ['music/fetch_track_details', 'movie/fetch_movie_details'],
    'remove': ['music/remove_track', 'movie/remove_movie']
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
    this._commonHttp.getJson(apiUrl, query).subscribe((data) => {
      if(data.status === 1){
        this.cardsData = data.result;
      }
    });
  }

  fetchDetails(searchId) {
    let apiUrl = this.urls['fetch_details'][this.switchType === 'music'?0:1];
    let query = {};
    query['track_id'] = searchId;
    this._commonHttp.getJson(apiUrl, query).subscribe((data) => {
      if(data.status === 1){
        this.detailsObject = data.result;
      }
    });
  }

  playMedia(sourceId) {
    this._commonSwitch.setSourceId(sourceId);
  }

  deleteMedia(sourceId, name){
    if(confirm("Are you sure to delete "+name)) {
      let apiUrl = this.urls['remove'][this.switchType === 'music'?0:1];
      let body = {};
      body['track_id'] = sourceId;
      this._commonHttp.postJson(apiUrl, body).subscribe((data) => {
        if(data.status === 1){
          this.fetchData();
          setTimeout(() => {
            this.toastr.success('Deleted', name + ' has been deleted!');
          }, 1500);
        }
      });
    }
  }

}
