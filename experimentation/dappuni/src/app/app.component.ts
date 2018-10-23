import { Component, ViewEncapsulation } from '@angular/core';
import { Web3Service } from './util/web3.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app works!';

  accounts: string[];
  currentAccount: string;
  currAccBalance;

  constructor(private web3Service: Web3Service, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    console.log('Constructor: ' + web3Service);
    iconRegistry.addSvgIcon(
      'ether-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/eth.svg'));
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.currentAccount = accounts[0];
      this.refreshBalance();
    });
  }

  async refreshBalance() {
    console.log('Refreshing balance');
    var web3 = this.web3Service.getWeb3();

    try {
      web3.eth.getBalance(this.currentAccount).then((balance) => {
        this.currAccBalance = web3.utils.fromWei(balance);
      })
    } catch (e) {
      console.log(e);
    }
  }

  getGenres() {

  }
}
