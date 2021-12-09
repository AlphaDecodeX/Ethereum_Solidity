import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from './lottery'

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { manager: '' }
  // }

  state = {
    manager: '', players: [],
    balance: '', value: '', message: ''
  };

  async componentDidMount() {
    // Do not need to call {from: accounts[0]} method..... 
    // when using Metamask Provider
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });

  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    }); // Going to take 15-30 sec to process.....

    this.setState({ message: 'You have been registered.' });

  }

  onClick = async (event) => {
    event.preventDefault();

    this.setState({ message: 'Wait for Winner declaration' })

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'Winner has been picked' })

  }

  render() {
    // console.log("Web3 Version is : ", web3.version);
    // web3.eth.getAccounts().then(console.log);


    return (
      <div>
        <h2>This is our Lottery Contract</h2>
        <p>
          This contract is managed by : {this.state.manager}.<br />
          There are currently {this.state.players.length} people entered.
          Competing to win {web3.utils.fromWei(this.state.balance)} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try..</h4>
          <div>
            <label>Amount to ether to enter</label>
            <input
              value={this.state.value}
              onChange={event =>
                this.setState({ value: event.target.value })} />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready to Pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner </button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
