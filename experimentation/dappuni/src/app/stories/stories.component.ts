import { Component, OnInit, Input } from '@angular/core';
import { Web3Service } from '../util/web3.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  @Input('story-name') storyName: string;
  @Input('genre') genreName: string;
  @Input('num') storynum: number;

  storyLoaded: boolean = true;
  newExcerptText:string = null;

  excerpts: string[] = [];

  account;

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    this.getExcrepts();
  }

  async createNewExcerpt() {
    let elems = document.getElementsByClassName("newExcerptInput") as HTMLCollection;
    console.log("stories.components:34" + this.storynum);
    let elem = elems[this.storynum] as HTMLTextAreaElement;
    let butt = document.getElementById("submit-button") as HTMLButtonElement;

    butt.disabled = true;

    this.newExcerptText = elem.value;
    console.log("stories.components:34" + elem.value);

    if (this.newExcerptText.length < 3) {
      alert("Excerpt too short");
      return;
    }

    if (!this.account) {
      this.account = this.web3Service.getAccount();
      console.log("stories.components:52" + this.account);
    }

    var controller = await this.web3Service.getController();
    controller.defaults({ from: this.account });
    console.log("stories.components:43" + controller);

    const deployedController = await controller.deployed();

    let gname = this.web3Service.getWeb3().utils.utf8ToHex(this.genreName);
    let sname = this.web3Service.getWeb3().utils.utf8ToHex(this.storyName);
    let ewords = this.web3Service.getWeb3().utils.utf8ToHex(this.newExcerptText);
    const transaction = await deployedController.addExcerpt(ewords, gname, sname);
    console.log("stories.components:55Transaction result:" + transaction);

    this.excerpts.push(this.newExcerptText);
    elem.value = "";
    butt.disabled = false;
  }

  async getExcrepts() {
    if (!this.account) {
      this.account = this.web3Service.getAccount();
      console.log("stories.components:65" + this.account);
    }
    let sname = this.web3Service.getWeb3().utils.utf8ToHex(this.storyName);
    let gname = this.web3Service.getWeb3().utils.utf8ToHex(this.genreName);

    this.web3Service.getController().then((controller) => {
      controller.defaults({ from: this.account });
      return controller.deployed();
    }).then((deployedController) => {
      return deployedController.getExcerpts(sname, gname);
    }).then((excerpts) => {
      console.log("stories.components:76" + excerpts)
      excerpts.forEach(excerpt => {
        console.log("stories.components:78" + excerpt);
        this.excerpts.push(this.web3Service.getWeb3().utils.toAscii(excerpt));
      });
    });
  }

}
