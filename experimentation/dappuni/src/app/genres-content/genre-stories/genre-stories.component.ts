import { Component, OnInit, Input } from '@angular/core';
import { Web3Service } from '../../util/web3.service';

declare let require: any;
const genre_artifacts = require('../../../../build/contracts/Genre.json');

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
    this.web3Service.artifactsToContract(genre_artifacts)
      .then((GenreAbstraction) => {
        this.Genre = GenreAbstraction;
      });
    console.log(this.genreName);
  }

  createNewStory() {
    let elem = document.getElementById("newStoryInput") as HTMLInputElement;
    this.newStoryName = elem.value;
    elem.value = "";
    console.log(this.newStoryName);

    if (this.newStoryName.length < 3) {
      alert("Story name too short");
      return;
    }

    this.web3Service.getController().then((instance) => {
      console.log(instance)
      return instance.getGenre(this.genreName);
    }).then((genreAddress) => {
      console.log(genreAddress);
      // return genre.createStory(this.newStoryName);

      this.web3Service.getGenre(genreAddress).then((genre) => {
        
        console.log(genre);
        // const encoded = new Buffer(this.newStoryName).toString('hex');
        return genre.createStory(this.newStoryName);
      }).then((storyAddress) => {
        console.log(storyAddress);
      });
    })

  }
}
