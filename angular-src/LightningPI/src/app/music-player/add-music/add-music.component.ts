import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../services/common-http.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.css']
})
export class AddMusicComponent implements OnInit {

  public searchAPI: string = '';
  private searchAPI_uri = ['http://itunes.apple.com/search?term=','&entity=song'];
  public trackSuggestions = [];
  public trackForm: FormGroup;

  constructor(private _commonHttp: CommonHttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.trackForm = this.formBuilder.group({
      'track_id': ['', Validators.required],
      'track_name': ['', Validators.required],
      'track_description': ['', Validators.required],
      'track_tags': ['', Validators.required],
      'track_image': ['', Validators.required],
      'track_file': [null, Validators.required],
    });
    this.trackForm.get('track_id').setValue((Math.random() * 1000000) + 1);
  }

  searchTrackDB() {
    let apiUrl = this.searchAPI_uri[0] + 
                 this.searchAPI.trim().replace(/ /g,"+") +
                 this.searchAPI_uri[1];
    this._commonHttp.getSuggestionsJson(apiUrl).subscribe((data) => {
      if(data) {
        this.trackSuggestions = data['results'];
      }
    });
  }

  autoFillForm(index) {
    let selectedItem = this.trackSuggestions[index];
    let formData = {
      track_id: selectedItem['trackId'] || '',
      track_name: selectedItem['trackName'] || '',
      track_description: ( 'Artist Name: ' + selectedItem['artistName'] +
                            '\nCollection Name: ' + selectedItem['collectionName'] +
                            '\nRelease Data: ' + selectedItem['releaseDate'] ) || '',
      track_tags: selectedItem['primaryGenreName'] || '',
      track_image: selectedItem['artworkUrl100'],
      track_file: this.trackForm.get('track_file').value || ''
    }
    this.trackForm.setValue(formData);
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.trackForm.patchValue({
      track_file: file
    });
    this.trackForm.get('track_file').updateValueAndValidity()
  }

  submitForm() {
    let apiUrl = 'music/upload';
    let body = {...this.trackForm.value};
    this._commonHttp.postFormData(apiUrl, body).subscribe((data) => {
      if(data.status === 1){
        this.trackForm.reset();
        setTimeout(() => {
          this.toastr.success('New track', body['track_name'] + ' has been added!');
        }, 1500);
      } else {
        this.toastr.error('Error', 'Error while adding track');
      }
    });
  }

  resetForm() {
    this.trackForm.reset();
    this.trackForm.get('track_id').setValue((Math.random() * 1000000) + 1);
  }

}
