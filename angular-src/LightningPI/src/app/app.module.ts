import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ViewCardsComponent } from './view-cards/view-cards.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CommonSwitchService } from './services/common-switch.service';
import { CommonHttpService } from './services/common-http.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {RouterModule, Routes} from '@angular/router';
import { AddMusicComponent } from './music-player/add-music/add-music.component';
import { AddMovieComponent } from './video-player/add-movie/add-movie.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: ViewCardsComponent
  },
  {
    path: 'addMusic',
    component: AddMusicComponent
  },
  {
    path: 'addMovie',
    component: AddMovieComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ViewCardsComponent,
    MusicPlayerComponent,
    VideoPlayerComponent,
    AddMusicComponent,
    AddMovieComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    HttpClientJsonpModule
  ],
  providers: [CommonSwitchService, CommonHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
