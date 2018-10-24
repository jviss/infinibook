import { Component, OnInit, Input } from '@angular/core';
import { Web3Service } from '../../util/web3.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

declare let require: any;
// const genre_artifacts = require('../../../../build/contracts/Genre.json');

@Component({
  selector: 'app-genre-stories',
  templateUrl: './genre-stories.component.html',
  styleUrls: ['./genre-stories.component.scss'],
})
export class GenreStoriesComponent implements OnInit {

  @Input('genre') genreName: string;

  Genre: any;

  storiesLoaded: boolean = true;
  stories: string[] = [];
  currentStory:string = null;
  currindex:number = 0;
  indices = {};

  newStoryName: string = "";
  displaying: boolean = false;

  accounts;
  account;

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    console.log(this.genreName);
    this.watchAccount();
    this.getStories();
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
    });
  }

  async createNewStory() {
    let elem = document.getElementById("newStoryInput") as HTMLInputElement;
    let butt = document.getElementById("submit-button") as HTMLButtonElement;

    butt.disabled = true;

    this.newStoryName = elem.value;
    console.log("genre-stories.components:51" + this.newStoryName);

    if (this.newStoryName.length < 3) {
      alert("Story name too short");
      butt.disabled = false;
      return;
    }

    var controller = await this.web3Service.getController();
    controller.defaults({ from: this.account });
    console.log(controller);

    const deployedController = await controller.deployed();
    let gname = this.web3Service.getWeb3().utils.utf8ToHex(this.genreName);
    let sname = this.web3Service.getWeb3().utils.utf8ToHex(this.newStoryName);

    if (!this.account) {
      this.account = this.web3Service.getAccount();
      console.log(this.account);
    }
    const transaction = await deployedController.createStory(gname, sname);
    // console.log(transaction);

    this.stories.push(this.newStoryName);
    this.indices[this.newStoryName] = this.currindex++;
    elem.value = "";
    butt.disabled = false;
  }

  async getStories() {
    if (!this.account) {
      this.account = this.web3Service.getAccount();
      console.log(this.account);
    }
    let gname = this.web3Service.getWeb3().utils.utf8ToHex(this.genreName);

    this.web3Service.getController().then((controller) => {
      controller.defaults({ from: this.account });
      return controller.deployed();
    }).then((deployedController) => {
      return deployedController.getStories(gname);
    }).then((stories) => {
      stories.forEach(story => {
        console.log("genre-stories.components:93" + story);
        this.stories.push(this.web3Service.getWeb3().utils.toAscii(story));
        this.indices[this.web3Service.getWeb3().utils.toAscii(story)] = this.currindex++;
      });
    });
  }

  getDisplay(storyName): boolean {
    if (this.currentStory) {
      if (storyName != this.currentStory) {
        return false;
      }
    }
    return true;
  }

  openStory(storyName) {
    var selements = document.getElementsByClassName('stories') as HTMLCollection;
    for (var i = 0; i < selements.length; i++) {
      var elem = selements[i] as HTMLElement;
      var elemh3s = elem.getElementsByTagName('h3');
      console.log("genre-stories.components:113" + (elemh3s[0] as HTMLElement).innerHTML.trim());
      console.log("genre-stories.components:114 " + storyName.trim());
      if ((elemh3s[0] as HTMLElement).innerHTML.trim() !== storyName.trim()) {
        elem.style.visibility = 'hidden';
      } else {

        elem.style.marginLeft = "5%";
        // elem.style.marginRight = "8%";
        elem.style.maxWidth = "90%";
        elem.style.width = "90%"
        elem.style.height = "45em"
      }
    }
    this.currentStory = storyName;
    this.displaying = true;
  }
}
