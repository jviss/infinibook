import { Component, OnInit, Input } from '@angular/core';
import { Web3Service } from '../../util/web3.service';

declare let require: any;
// const genre_artifacts = require('../../../../build/contracts/Genre.json');

@Component({
  selector: 'app-genre-stories',
  templateUrl: './genre-stories.component.html',
  styleUrls: ['./genre-stories.component.scss']
})
export class GenreStoriesComponent implements OnInit {
  
  @Input('genre') genreName: string;

  Genre: any;

  storiesLoaded: boolean = true;
  stories: string[] = [];

  newStoryName: string = "";

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    console.log(this.genreName);
  }

  async createNewStory() {
    let elem = document.getElementById("newStoryInput") as HTMLInputElement;
    let butt = document.getElementById("submit-button") as HTMLButtonElement;

    butt.disabled = true;

    this.newStoryName = elem.value;
    console.log(this.newStoryName);

    if (this.newStoryName.length < 3) {
      alert("Story name too short");
      return;
    }

    var controller = await this.web3Service.getController();
    await controller.createStory(this.genreName, this.newStoryName);
    
    this.stories.push(this.newStoryName);
    elem.value = "";
    butt.disabled = false;

    // this.web3Service.getController().then((ControllerInstance) => {
    //   console.log(ControllerInstance);

    //   return ControllerInstance.createStory(this.genreName, this.newStoryName);
    // }).then(() => {
    //   this.stories.push(this.newStoryName);
    //   elem.value = "";
    //   butt.disabled = false;
    // });
  }
}
