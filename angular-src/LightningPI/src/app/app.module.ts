import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ViewCardsComponent } from './view-cards/view-cards.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CommonSwitchService } from './services/common-switch.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ViewCardsComponent,
    MusicPlayerComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule
  ],
  providers: [CommonSwitchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
