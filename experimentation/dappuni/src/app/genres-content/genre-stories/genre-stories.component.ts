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

  accounts;
  account;

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    console.log(this.genreName);
    this.watchAccount();
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
    console.log(this.newStoryName);

    if (this.newStoryName.length < 3) {
      alert("Story name too short");
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
    const transaction = await deployedController.createStory.sendTransaction(gname, sname, {from: this.account});
    // console.log(transaction);
    
    this.stories.push(this.newStoryName);
    elem.value = "";
    butt.disabled = false;
  }
}
