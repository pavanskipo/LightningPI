import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../services/common-http.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  public searchAPI: string = '';
  private searchAPI_uri = ' http://www.omdbapi.com/?apikey=<secret_key>';
  public movieSuggestions = [];
  public movieForm: FormGroup;
  progress: number = 0;

  constructor(private _commonHttp: CommonHttpService,
  private formBuilder: FormBuilder,
  private toastr: ToastrService) { }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      'movie_id': ['', Validators.required],
      'movie_name': ['', Validators.required],
      'movie_plot': ['', Validators.required],
      'movie_tags': ['', Validators.required],
      'movie_image': ['', Validators.required],
      'movie_file': [null, Validators.required],
    });
    this.movieForm.get('movie_id').setValue((Math.random() * 1000000) + 1);
  }

  searchMovieDB() {
    let apiUrl = this.searchAPI_uri + '&s=' + this.searchAPI;
    this._commonHttp.getSuggestionsJson(apiUrl).subscribe((data) => {
      if(data) {
        this.movieSuggestions = data['Search'];
      }
    });
  }

  autoFillForm(index) {
    let selectedItemId = this.movieSuggestions[index]['imdbID'];
    let apiUrl = this.searchAPI_uri + '&i=' + selectedItemId;
    this._commonHttp.getSuggestionsJson(apiUrl).subscribe((selectedItem) => {
      if(selectedItem) {        
        let formData = {
          movie_id: selectedItemId || '',
          movie_name: selectedItem['Title'] || '',
          movie_plot: selectedItem['Plot'] || '',
          movie_tags: selectedItem['Genre'] || '',
          movie_image: selectedItem['Poster'],
          movie_file: this.movieForm.get('movie_file').value || ''
        }
        this.movieForm.setValue(formData);
      } else {
        this.toastr.error('Error', 'Error while fetching data from OmDB');
      }
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.movieForm.patchValue({
      movie_file: file
    });
    this.movieForm.get('movie_file').updateValueAndValidity()
  }

  submitForm() {
    let apiUrl = 'movie/upload';
    let body = {...this.movieForm.value};
    this._commonHttp.postFormData(apiUrl, body)
    .subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          let data = event.body;
          if(data.status === 1){
            this.movieForm.reset();
            setTimeout(() => {
              this.movieForm.reset();
              this.toastr.success('New movie', body['movie_name'] + ' has been added!');
            }, 1500);
          } else {
            this.toastr.error('Error', 'Error while adding movie');
          }
      }
    });
  }

  resetForm() {
    this.movieForm.reset();
    this.movieForm.get('movie_id').setValue((Math.random() * 1000000) + 1);
  }

}
