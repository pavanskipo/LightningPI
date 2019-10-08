import { Component, OnInit } from '@angular/core';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  public player; 
  constructor() { }

  ngOnInit() {
    this.player = new Plyr('#plyrID', { captions: { active: true } });
  }

}
