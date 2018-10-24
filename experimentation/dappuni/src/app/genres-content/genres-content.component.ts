import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { CardCommunicationService } from '../util/card-communication.service';

@Component({
  selector: 'app-genres-content',
  templateUrl: './genres-content.component.html',
  styleUrls: ['./genres-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenresContentComponent implements OnInit {

  genres: string[] = ['Science Fiction', 'Adventure', 'Fantasy', 'Erotica'];

  currentGenre: string = null;

  currentTag: string = null;

  displaying: boolean = false;

  constructor(private web3Service: Web3Service, private cardComm: CardCommunicationService) { }

  ngOnInit() {
  }

  onClick(genre) {
    if (this.currentGenre == genre) {

    } else {
      this.currentGenre = genre;
      this.displaying = true;

      let g = null;
      switch(this.genres.indexOf(genre)) {
        case 0:
          g = 'scifi';
          break;

        case 1:
          g = 'adventure';
          break;
        
        case 2:
          g = 'fantasy';
          break;

        case 3:
          g = 'erotica';
          break;
      }

      this.currentTag = g;

      let card = document.getElementById(g) as HTMLElement;
      // console.log(card);
      card.style.marginLeft = "8%";
      card.style.marginRight = "8%";
      card.style.maxWidth = "80%";
      card.style.width = "80%"
      card.style.height = "auto"
    }
  }

  getDisplay(genre): boolean {
    if (this.currentGenre) {
      if (genre != this.currentGenre) {
        return false;
      }
    }
    return true;
  }

  backClicked() {
    this.currentGenre = null;
    this.displaying = false;

    let card = document.getElementById(this.currentTag) as HTMLElement;
    // console.log(card);
    card.style.marginLeft = "1%";
    card.style.marginRight = "1%";
    card.style.maxWidth = "44%";
    card.style.width = "44%"
    card.style.height = "30em"
  }
}
