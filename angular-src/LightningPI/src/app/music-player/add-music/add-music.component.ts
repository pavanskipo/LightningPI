import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../services/common-http.service';

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.css']
})
export class AddMusicComponent implements OnInit {

  public searchAPI: string = '';
  private searchAPI_uri = ['http://itunes.apple.com/search?term=','&entity=song'];
  public trackSuggestions = [];

  constructor(private _commonHttp: CommonHttpService) { }

  ngOnInit() {
  }

  searchTrackDB() {
    let apiUrl = this.searchAPI_uri[0] + 
                 this.searchAPI.trim().replace(/ /g,"+") +
                 this.searchAPI_uri[1];
    this._commonHttp.getSuggestionsJson(apiUrl).subscribe((data) => {
      if(data) {
        console.log(data)
      }
    });
  }

}
