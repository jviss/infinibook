import {Injectable} from '@angular/core';
import * as contract from 'truffle-contract';
// import * as artifacts from 'truffle-artifacts';
import {Subject} from 'rxjs';

declare let require: any;
const Web3 = require('web3');
const ControllerAddress = '0xdd1fa5352d97bdc50c3296e1918357ef82c65faa'
const ControllerABI = [{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"genres","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"getGenre","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"words","type":"bytes32"},{"name":"genre","type":"bytes32"},{"name":"story","type":"bytes32"}],"name":"addExcerpt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const GenreABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"storyNames","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"stories","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"n","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"sname","type":"bytes32"}],"name":"createStory","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"sname","type":"bytes32"}],"name":"getStory","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getStories","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"}];
const StoryABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"_words","type":"bytes32"}],"name":"addWords","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getExcerpts","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}];
const ExcerptABI = [{"constant":true,"inputs":[],"name":"words","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"w","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getWords","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}];

declare let window: any;

@Injectable()
export class Web3Service {
  private web3: any;
  private accounts: string[];
  public ready = false;
  // public MetaCoin: any;
  public accountsObservable = new Subject<string[]>();

  private controllerContract: contract;

  constructor() {
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  public getWeb3() {
    return this.web3;
  }

  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    }

    setInterval(() => this.refreshAccounts(), 100);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;

  }

  private refreshAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err != null) {
        console.warn('There was an error fetching your accounts.');
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');

        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }

  public async getController() {
    if (!this.controllerContract) {
      this.controllerContract = contract({'abi': ControllerABI});
      this.controllerContract.setProvider(this.web3.currentProvider);
    }
    
    return this.controllerContract.at(ControllerAddress);
  }

  public async getGenre(gAddress: string) {
    var gcontract = contract({'abi': GenreABI});
    gcontract.setProvider(this.web3.currentProvider);
    // gcontract.defaults({from: this.web3.eth.coinbase});
    return gcontract.at(gAddress);
  }

  public async getStory(sAddress: string) {
    var scontract = contract({'abi': StoryABI});
    scontract.setProvider(this.web3.currentProvider);
    // scontract.defaults({from: this.web3.eth.coinbase});
    return scontract.at(sAddress);
  }

  public async getExcerpt(eAddress: string) {
    var econtract = contract({'abi': ExcerptABI});
    econtract.setProvider(this.web3.currentProvider);
    return econtract.at(eAddress);
  }
}