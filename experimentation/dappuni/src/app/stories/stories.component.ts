import { Component, OnInit, Input } from '@angular/core';
import { Web3Service } from '../util/web3.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  @Input('story-name') storyName: string;

  storyLoaded: boolean = true;

  excerpts: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
